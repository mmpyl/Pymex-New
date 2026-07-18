import { RegisterDto } from '../dtos/RegisterDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
import { User } from '../../../domain/user/entities/User';
import { Email } from '../../../domain/user/value-objects/Email';
import { Password } from '../../../domain/user/value-objects/Password';
import { UserRole } from '../../../domain/user/value-objects/UserRole';
import { JwtService } from '../../../infrastructure/services/JwtService';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(dto: RegisterDto): Promise<AuthResponseDto> {
    const emailExists = await this.userRepository.existsByEmail(dto.email);
    
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await this.passwordService.hash(dto.password);

    const user = User.create({
      nombre: dto.nombre.trim(),
      email: Email.create(dto.email),
      password: Password.create(hashedPassword),
      rol: UserRole.create(dto.rol as any || 'empleado'),
      empresaId: dto.empresaId,
      estado: 'activo'
    });

    await this.userRepository.save(user);

    const userId = user.getId().getValue();
    const userData = {
      userId,
      id: userId,
      email: user.getEmail().getValue(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId()
    };

    const accessToken = JwtService.generateAccessToken(userData);
    const refreshToken = JwtService.generateRefreshToken(userData);

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
      user: {
        id: userId,
        nombre: user.getNombre(),
        email: user.getEmail().getValue(),
        rol: user.getRol().getValue(),
        empresaId: user.getEmpresaId()
      }
    };
  }
}