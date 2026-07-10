import { UserResponseDto } from '../dtos/UserResponseDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
export declare class UpdateUserProfileUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(userId: number, dto: Partial<UpdateUserDto>): Promise<UserResponseDto>;
}
//# sourceMappingURL=UpdateUserProfileUseCase.d.ts.map