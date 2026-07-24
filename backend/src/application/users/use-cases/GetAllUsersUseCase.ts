import { UserResponseDto } from '../dtos/UserResponseDto';
import { UserMapper } from '../mappers/UserMapper';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(empresaId?: number, page: number = 1, limit: number = 10): Promise<{ users: UserResponseDto[]; total: number }> {
    if (empresaId) {
      const result = await this.userRepository.findByEmpresaId(empresaId, page, limit);
      return {
        users: UserMapper.toResponseDtoList(result.users),
        total: result.total,
      };
    }

    const result = await this.userRepository.findAll(page, limit);

    return {
      users: UserMapper.toResponseDtoList(result.users),
      total: result.total,
    };
  }
}
