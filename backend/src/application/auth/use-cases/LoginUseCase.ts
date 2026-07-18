import { LoginDto } from '../dtos/LoginDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
import { InvalidCredentialsError } from '../../../domain/user/errors/InvalidCredentialsError';
import { JwtService } from '../../../infrastructure/services/JwtService';


export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
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
        empresaId: user.getEmpresaId(),
      },
    };
  }
}