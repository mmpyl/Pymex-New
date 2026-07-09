import { RefreshTokenDto } from '../dtos/RefreshTokenDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';


interface JwtPayload {
  id: string;
  email: string;
  rol: string;
  empresaId?: number;
}

export class RefreshTokenUseCase {
  constructor(
    private jwtSecret: string,
    private jwtExpiresIn: string = '15m',
    private jwtRefreshExpiresIn: string = '7d'
  ) {}

  async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    try {
      const decoded = jwt.verify(dto.refreshToken, this.jwtSecret) as JwtPayload;

      const userData = {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol,
        empresaId: decoded.empresaId
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
          id: decoded.id,
          nombre: '', 
          email: decoded.email,
          rol: decoded.rol,
          empresaId: decoded.empresaId
        }
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}