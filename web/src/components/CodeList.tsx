import React, { useState, useEffect } from "react";
import { TwoFactorCode } from "../types/twoFactor";
import { Token } from "../types";
import { generateToken } from "../utils/totp";

interface CodeListProps {
  codes: TwoFactorCode[];
  onDelete: (id: string) => void;
}

export const CodeList: React.FC<CodeListProps> = ({ codes, onDelete }) => {
  const [tokens, setTokens] = useState<Record<string, Token>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTokens: Record<string, Token> = {};
      codes.forEach((code) => {
        const token = generateToken(code.secret, code.issuer, code.service);
        if (token) {
          newTokens[code._id] = token;
        }
      });
      setTokens(newTokens);
    }, 1000);

    return () => clearInterval(interval);
  }, [codes]);

  const handleCopy = (token: string, id: string) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (codes.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum código 2FA cadastrado</p>
      </div>
    );
  }

  return (
    <ul className="code-list">
      {codes.map((code) => (
        <li key={code._id} className="code-item">
          <div className="code-header">
            <h3 title={code.service}>{code.service}</h3>
            <p title={code.issuer}>{code.issuer}</p>
          </div>
          <div className="code-content">
            <div className="token-container">
              <div
                className={`token-value ${
                  copiedId === code._id ? "copied" : ""
                }`}
                onClick={() =>
                  handleCopy(tokens[code._id]?.otp || "", code._id)
                }
                title="Clique para copiar"
              >
                {tokens[code._id]?.otp || "Gerando..."}
              </div>
              <div className="token-timer">
                {tokens[code._id]
                  ? Math.max(
                      0,
                      Math.floor((tokens[code._id].expires - Date.now()) / 1000)
                    )
                  : "--"}
                s
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
