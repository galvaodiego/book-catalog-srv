export interface JwtPayload {
  id: number;
  email: string;
  nome: string;
  iat?: number;
  exp?: number;
}
