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
        estado: user.getEstado(),
      },
      accessToken,
      refreshToken,
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
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    });
  }
}
