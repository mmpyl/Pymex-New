import { RefreshTokenDto } from '../dtos/RefreshTokenDto';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { JwtService, JwtPayload } from '../../../infrastructure/services/JwtService';

export class RefreshTokenUseCase {
  async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    try {
      const decoded = JwtService.verifyRefreshToken(dto.refreshToken);

      const userData = {
        id: decoded.userId,
        email: decoded.email,
        rol: decoded.rol,
        empresaId: decoded.empresaId
      };

      const accessToken = JwtService.generateAccessToken(userData);
      const refreshToken = JwtService.generateRefreshToken(userData);

      return {
        accessToken,
        refreshToken,
        expiresIn: 3600,
        user: {
          id: decoded.userId,
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