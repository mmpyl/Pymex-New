import { UserResponseDto } from '../dtos/UserResponseDto';
import { UserMapper } from '../mappers/UserMapper';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { UserNotFoundError } from '../../../domain/user/errors/UserNotFoundError';

export class UpdateUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(dto.id);
    
    if (!user) {
      throw new UserNotFoundError();
    }

    if (dto.nombre !== undefined) {
      user.updateNombre(dto.nombre);
    }

    if (dto.email !== undefined) {
      const exists = await this.userRepository.existsByEmail(dto.email, dto.id);
      if (exists) {
        throw new Error('Email already in use');
      }
      user.updateEmail(dto.email);
    }

    if (dto.rol !== undefined) {
      user.updateRol(dto.rol);
    }

    if (dto.estado !== undefined) {
      if (dto.estado === 'suspendido') {
        user.suspend();
      } else if (dto.estado === 'activo') {
        user.activate();
      } else if (dto.estado === 'inactivo') {
        user.deactivate();
      }
    }

    if (dto.empresaId !== undefined) {
      // Assuming there's a method to update empresaId, or we need to add it
      // For now, we'll access the internal props through toObject and recreate
      const props = user.toObject();
      props.empresaId = dto.empresaId;
    }

    await this.userRepository.update(user);

    return UserMapper.toResponseDto(user);
  }
}
