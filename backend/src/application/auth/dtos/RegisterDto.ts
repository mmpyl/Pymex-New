export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  empresaId?: number;
}