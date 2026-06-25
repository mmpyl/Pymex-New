export interface CreateUserDto {
  nombre: string;
  email: string;
  password: string;
  rol: 'super_admin' | 'admin' | 'soporte' | 'gerente' | 'empleado' | 'contador';
  empresaId?: number;
}
