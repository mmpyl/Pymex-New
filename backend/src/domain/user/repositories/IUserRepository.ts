import { User } from '../entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmpresaId(empresaId: number, page?: number, limit?: number): Promise<{ users: User[]; total: number }>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  existsByEmail(email: string, excludeId?: string): Promise<boolean>;
}