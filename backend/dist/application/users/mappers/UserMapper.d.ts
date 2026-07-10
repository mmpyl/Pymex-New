import { User } from '../../../domain/user/entities/User';
import { UserResponseDto } from '../dtos/UserResponseDto';
export declare class UserMapper {
    static toResponseDto(user: User): UserResponseDto;
    static toResponseDtoList(users: User[]): UserResponseDto[];
}
//# sourceMappingURL=UserMapper.d.ts.map