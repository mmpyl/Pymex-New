import { UserResponseDto } from '../dtos/UserResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
export declare class GetUserByIdUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<UserResponseDto>;
}
//# sourceMappingURL=GetUserByIdUseCase.d.ts.map