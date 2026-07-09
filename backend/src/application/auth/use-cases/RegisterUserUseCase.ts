import { RegisterDto } from '../dtos/RegisterDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
import { User } from '../../../domain/user/entities/User';
import { Email } from '../../../domain/user/value-objects/Email';
import { Password } from '../../../domain/user/value-objects/Password';
import { UserRole } from '../../../domain/user/value-objects/UserRole';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';


export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private jwtSecret: string,
    private jwtExpiresIn: string = '15m',
    private jwtRefreshExpiresIn: string = '7d'
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
      id: userId,
      email: user.getEmail().getValue(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId()
    };

    const secret = this.jwtSecret as Secret;

    const accessToken = jwt.sign(userData, secret, {
      expiresIn: this.jwtExpiresIn
    } as SignOptions);

    const refreshToken = jwt.sign(userData, secret, {
      expiresIn: this.jwtRefreshExpiresIn
    } as SignOptions);


    return {
      accessToken,
      refreshToken,
      expiresIn: parseInt(this.jwtExpiresIn) * 60,
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