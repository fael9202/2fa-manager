export interface TwoFactorInput {
  service: string;
  secret: string;
  issuer: string;
}

export interface TwoFactorDocument extends TwoFactorInput {
  _id: string;
  createdAt: Date;
}
