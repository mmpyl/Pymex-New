import { RefreshTokenDto } from '../dtos/RefreshTokenDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import jwt from 'jsonwebtoken';

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