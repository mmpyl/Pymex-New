import { RegisterDto } from '../dtos/RegisterDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
export declare class RegisterUserUseCase {
    private userRepository;
    private passwordService;
    constructor(userRepository: IUserRepository, passwordService: IPasswordService);
    execute(dto: RegisterDto): Promise<AuthResponseDto>;
}
//# sourceMappingURL=RegisterUserUseCase.d.ts.map