import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/auth/use-cases/LoginUseCase';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/RegisterUserUseCase';
import { RefreshTokenUseCase } from '../../../application/auth/use-cases/RefreshTokenUseCase';
import { LogoutUseCase } from '../../../application/auth/use-cases/LogoutUseCase';
import { LoginDto } from '../../../application/auth/dtos/LoginDto';
import { RegisterDto } from '../../../application/auth/dtos/RegisterDto';
import { RefreshTokenDto } from '../../../application/auth/dtos/RefreshTokenDto';

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUserUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private logoutUseCase: LogoutUseCase
  ) {}

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const dto: LoginDto = { email, password };
      const result = await this.loginUseCase.execute(dto);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      if (error.name === 'InvalidCredentialsError') {
        res.status(401).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Login failed' });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, email, password, rol, empresaId } = req.body;
      
      if (!nombre || !email || !password) {
        res.status(400).json({ error: 'Nombre, email and password are required' });
        return;
      }

      const dto: RegisterDto = { nombre, email, password, rol, empresaId };
      const result = await this.registerUseCase.execute(dto);
      
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      if (error.message === 'Email already registered') {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Registration failed' });
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token is required' });
        return;
      }

      const dto: RefreshTokenDto = { refreshToken };
      const result = await this.refreshTokenUseCase.execute(dto);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message || 'Token refresh failed' });
    }
  };

  logout = async (_req: Request, res: Response): Promise<void> => {
    try {
      await this.logoutUseCase.execute();
      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Logout failed' });
    }
  };
}