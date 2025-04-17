import * as OTPAuth from "otpauth";
import { Token } from "../types";

export const generateToken = (
  secret: string,
  issuer: string,
  service: string
): Token | null => {
  try {
    if (!secret) return null;

    // Limpa a chave secreta
    const cleanSecret = secret
      .toUpperCase()
      .replace(/[^A-Z2-7]/g, "") // Remove caracteres inválidos
      .replace(/=/g, ""); // Remove caracteres de padding

    if (!cleanSecret) {
      console.error("Chave secreta inválida após limpeza");
      return null;
    }

    // Cria o objeto TOTP diretamente
    const totp = new OTPAuth.TOTP({
      issuer: issuer,
      label: service,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(cleanSecret),
    });

    // Gera o token
    const token = totp.generate();
    const remaining =
      totp.period - (Math.floor(Date.now() / 1000) % totp.period);

    return {
      otp: token,
      expires: Date.now() + remaining * 1000,
    };
  } catch (error) {
    console.error("Erro ao gerar token:", error);
    return null;
  }
};
