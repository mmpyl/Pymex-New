import { User } from '../entities/User';

export interface IUserDomainService {
  createUser(
    nombre: string,
    email: string,
    password: string,
    rol: string,
    empresaId?: number
  ): Promise<User>;

  updateUserRole(userId: string, nuevoRol: string): Promise<User>;
  suspendUser(userId: string): Promise<void>;
  activateUser(userId: string): Promise<void>;
  validateUserAccess(user: User): boolean;
}
