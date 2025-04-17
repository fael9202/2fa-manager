import React, { useState } from "react";

interface AddCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { service: string; secret: string; issuer: string }) => void;
}

export const AddCodeModal: React.FC<AddCodeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    service: "",
    secret: "",
    issuer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ service: "", secret: "", issuer: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Código 2FA</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="service">Serviço</label>
            <input
              type="text"
              id="service"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="secret">Chave Secreta</label>
            <input
              type="text"
              id="secret"
              value={formData.secret}
              onChange={(e) =>
                setFormData({ ...formData, secret: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuer">Emissor</label>
            <input
              type="text"
              id="issuer"
              value={formData.issuer}
              onChange={(e) =>
                setFormData({ ...formData, issuer: e.target.value })
              }
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
