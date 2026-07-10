import { IUserRepository } from '../../domain/user/repositories/IUserRepository';
import { User } from '../../domain/user/entities/User';
export declare class UserRepository implements IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByEmpresaId(empresaId: number, page?: number, limit?: number): Promise<{
        users: User[];
        total: number;
    }>;
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
    existsByEmail(email: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map