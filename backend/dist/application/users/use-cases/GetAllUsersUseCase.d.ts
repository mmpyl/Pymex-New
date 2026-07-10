import { UserResponseDto } from '../dtos/UserResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
export declare class GetAllUsersUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(empresaId?: number, page?: number, limit?: number): Promise<{
        users: UserResponseDto[];
        total: number;
    }>;
}
//# sourceMappingURL=GetAllUsersUseCase.d.ts.map