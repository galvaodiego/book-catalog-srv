export interface JwtPayload {
  sub: number; // ID do usuário
  email: string; // Email do usuário
  iat?: number; // Issued at (opcional)
  exp?: number; // Expiration time (opcional)
}
