export interface TwoFactorCode {
  _id: string;
  service: string;
  secret: string;
  issuer: string;
  createdAt: string;
}
