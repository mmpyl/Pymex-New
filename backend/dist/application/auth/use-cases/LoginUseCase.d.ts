import { LoginDto } from '../dtos/LoginDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
export declare class LoginUseCase {
    private userRepository;
    private passwordService;
    constructor(userRepository: IUserRepository, passwordService: IPasswordService);
    execute(dto: LoginDto): Promise<AuthResponseDto>;
}
//# sourceMappingURL=LoginUseCase.d.ts.map