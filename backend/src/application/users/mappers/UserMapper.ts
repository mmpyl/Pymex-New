import { User } from '../../../domain/user/entities/User';
import { UserResponseDto } from '../dtos/UserResponseDto';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.getId().getValue(),
      nombre: user.getNombre(),
      email: user.getEmail().getValue(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId(),
      estado: user.getEstado(),
      fechaRegistro: user.getFechaRegistro(),
    };
  }

  static toResponseDtoList(users: User[]): UserResponseDto[] {
    return users.map(user => this.toResponseDto(user));
  }
}
