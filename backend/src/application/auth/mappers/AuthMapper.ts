import { User } from '../../../domain/user/entities/User';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { UserModel } from '../../../infrastructure/database/models/user.model';
import { Email } from '../../../domain/user/value-objects/Email';
import { Password } from '../../../domain/user/value-objects/Password';
import { UserId } from '../../../domain/user/value-objects/UserId';
import { UserRole } from '../../../domain/user/value-objects/UserRole';

export class AuthMapper {

  static toAuthResponse(
    user: User,
    accessToken: string,
    refreshToken: string,
    _expiresIn: number,
  ): AuthResponseDto {
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

      id: UserId.create(String(model.id)),
      nombre: model.nombre,
      email: Email.create(String(model.email)),
      password: Password.fromHash(String(model.password)),
      rol: UserRole.create(model.rol),
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,

    });
  }
}

