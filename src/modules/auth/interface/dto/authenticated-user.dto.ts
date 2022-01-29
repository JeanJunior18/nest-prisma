export interface AuthenticatedUser {
  name: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
}
