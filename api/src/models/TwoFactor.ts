import mongoose from "mongoose";
import type { TwoFactorInput } from "../types/twoFactor";

const twoFactorSchema = new mongoose.Schema<TwoFactorInput>({
  service: {
    type: String,
    required: true,
    trim: true,
  },
  secret: {
    type: String,
    required: true,
    trim: true,
  },
  issuer: {
    type: String,
    required: true,
    trim: true,
  },
});

export const TwoFactor = mongoose.model<TwoFactorInput>(
  "TwoFactor",
  twoFactorSchema
);
