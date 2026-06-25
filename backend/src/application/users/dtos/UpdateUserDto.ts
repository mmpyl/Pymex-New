export interface UpdateUserDto {
  id: string;
  nombre?: string;
  email?: string;
  rol?: 'super_admin' | 'admin' | 'soporte' | 'gerente' | 'empleado' | 'contador';
  empresaId?: number;
  estado?: 'activo' | 'inactivo' | 'suspendido';
}
