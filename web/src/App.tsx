import React, { useState, useEffect } from "react";
import { CodeList } from "./components/CodeList";
import { AddCodeModal } from "./components/AddCodeModal";
import { TwoFactorCode } from "./types/twoFactor";
import "./styles.css";

const API_URL = "http://localhost:3000/api/2fa";

export const App: React.FC = () => {
  const [codes, setCodes] = useState<TwoFactorCode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setCodes(data.data);
      } else {
        setError(data.error || "Erro ao carregar códigos");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  const handleAddCode = async (codeData: {
    service: string;
    secret: string;
    issuer: string;
  }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(codeData),
      });

      const data = await response.json();
      if (data.success) {
        setCodes([...codes, data.data]);
        setIsModalOpen(false);
      } else {
        setError(data.error || "Erro ao adicionar código");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setCodes(codes.filter((code) => code._id !== id));
      } else {
        setError(data.error || "Erro ao excluir código");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>2FA Manager</h1>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Adicionar Código
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main>
        <CodeList codes={codes} onDelete={handleDeleteCode} />
      </main>

      <AddCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCode}
      />
    </div>
  );
};
