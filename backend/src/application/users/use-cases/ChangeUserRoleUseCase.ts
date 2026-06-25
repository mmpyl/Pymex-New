import { UserResponseDto } from '../dtos/UserResponseDto';
import { UserMapper } from '../mappers/UserMapper';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { UserNotFoundError } from '../../../domain/user/errors/UserNotFoundError';
import { UserRoleType } from '../../../domain/user/value-objects/UserRole';

export class ChangeUserRoleUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, newRole: UserRoleType): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new UserNotFoundError();
    }

    user.updateRol(newRole);
    await this.userRepository.update(user);

    return UserMapper.toResponseDto(user);
  }
}
