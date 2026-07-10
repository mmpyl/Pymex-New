import { UserResponseDto } from '../dtos/UserResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { UserRoleType } from '../../../domain/user/value-objects/UserRole';
export declare class ChangeUserRoleUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(userId: string, newRole: UserRoleType): Promise<UserResponseDto>;
}
//# sourceMappingURL=ChangeUserRoleUseCase.d.ts.map