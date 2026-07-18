import { User } from '../../../domain/user/entities/User';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { UserModel } from '../../../infrastructure/database/models/user.model';
export declare class AuthMapper {
    static toAuthResponse(user: User, accessToken: string, refreshToken: string, _expiresIn: number): AuthResponseDto;
    static toDomainUser(model: UserModel): User;
}
//# sourceMappingURL=AuthMapper.d.ts.map