import { TwoFactor } from "../models/TwoFactor.js";
import type { TwoFactorInput } from "../types/twoFactor.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const listCodes = async () => {
  try {
    const codes = await TwoFactor.find();
    return successResponse(codes);
  } catch (error) {
    return errorResponse("Erro ao buscar códigos 2FA");
  }
};

export const createCode = async (data: TwoFactorInput) => {
  try {
    if (!data.service || !data.secret || !data.issuer) {
      return errorResponse("Campos obrigatórios faltando");
    }
    const existingCode = await TwoFactor.findOne({ service: data.service });
    if (existingCode) {
      return errorResponse("Código já existe");
    }
    const newCode = new TwoFactor(data);
    await newCode.save();
    return successResponse(newCode);
  } catch (error) {
    return errorResponse("Erro ao criar código 2FA");
  }
};

export const deleteCode = async (id: string) => {
  try {
    const result = await TwoFactor.findByIdAndDelete(id);
    if (!result) {
      return errorResponse("Código não encontrado");
    }
    return successResponse(null);
  } catch (error) {
    return errorResponse("Erro ao deletar código 2FA");
  }
};
