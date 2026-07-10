import { UserResponseDto } from '../dtos/UserResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
export declare class SuspendUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<UserResponseDto>;
}
//# sourceMappingURL=SuspendUserUseCase.d.ts.map