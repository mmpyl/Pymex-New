import { UserResponseDto } from '../dtos/UserResponseDto';
import { UserMapper } from '../mappers/UserMapper';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { UserNotFoundError } from '../../../domain/user/errors/UserNotFoundError';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new UserNotFoundError();
    }

    return UserMapper.toResponseDto(user);
  }
}
