import { User } from '../../../domain/user/entities/User';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { UserModel } from '../../../infrastructure/database/models/user.model';

export class AuthMapper {
  static toAuthResponse(user: User, accessToken: string, refreshToken: string): AuthResponseDto {
    return {
      user: {
        id: user.getId().getValue(),
        nombre: user.getNombre(),
        email: user.getEmail().getValue(),
        rol: user.getRol().getValue(),
        empresaId: user.getEmpresaId(),
      },
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  static toDomainUser(model: UserModel): User {
    return User.restore({
      id: model.id,
      nombre: model.nombre,
      email: model.email,
      password: model.password,
      rol: model.rol,
      empresaId: model.empresaId,
      estado: model.estado as 'activo' | 'inactivo' | 'suspendido',
      fechaRegistro: model.fechaRegistro,
    });
  }
}
