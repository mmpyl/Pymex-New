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

    // If no empresaId, get all users (for super admin)
    const allUsers: any[] = [];
    let currentPage = 1;
    const pageSize = 100;
    
    while (true) {
      const result = await this.userRepository.findByEmpresaId(0, currentPage, pageSize);
      if (result.users.length === 0) break;
      allUsers.push(...result.users);
      if (result.users.length < pageSize) break;
      currentPage++;
    }

    const paginatedUsers = allUsers.slice((page - 1) * limit, page * limit);
    
    return {
      users: UserMapper.toResponseDtoList(paginatedUsers),
      total: allUsers.length,
    };
  }
}
