import { LoginDto } from '../dtos/LoginDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
import { UserNotFoundError } from '../../../domain/user/errors/UserNotFoundError';
import { InvalidCredentialsError } from '../../../domain/user/errors/InvalidCredentialsError';
import jwt from 'jsonwebtoken';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private jwtSecret: string,
    private jwtExpiresIn: string = '15m',
    private jwtRefreshExpiresIn: string = '7d'
  ) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    
    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.isActive()) {
      throw new Error(`User account is ${user.getEstado()}`);
    }

    const passwordMatch = await this.passwordService.compare(
      dto.password,
      user.getPassword().getValue()
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const userId = user.getId().getValue();
    const userData = {
      id: userId,
      email: user.getEmail().getValue(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId()
    };

    const accessToken = jwt.sign(userData, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    });

    const refreshToken = jwt.sign(userData, this.jwtSecret, {
      expiresIn: this.jwtRefreshExpiresIn
    });

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