import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
export declare class CreateUserUseCase {
    private userRepository;
    private passwordService;
    constructor(userRepository: IUserRepository, passwordService: IPasswordService);
    execute(dto: CreateUserDto): Promise<UserResponseDto>;
}
//# sourceMappingURL=CreateUserUseCase.d.ts.map