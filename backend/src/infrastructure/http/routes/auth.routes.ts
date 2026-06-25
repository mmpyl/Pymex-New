import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../../repositories/user.repository';
import { BcryptPasswordService } from '../../services/BcryptPasswordService';
import { LoginUseCase } from '../../../application/auth/use-cases/LoginUseCase';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/RegisterUserUseCase';
import { RefreshTokenUseCase } from '../../../application/auth/use-cases/RefreshTokenUseCase';
import { LogoutUseCase } from '../../../application/auth/use-cases/LogoutUseCase';
import { authMiddleware } from '../middleware/auth.middleware';
import { env } from '../../config/env';

const router = Router();

// Initialize dependencies
const userRepository = new UserRepository();
const passwordService = new BcryptPasswordService();

// Initialize use cases with JWT configuration from environment
const loginUseCase = new LoginUseCase(
  userRepository, 
  passwordService,
  env.JWT_SECRET,
  env.JWT_EXPIRES_IN || '15m',
  env.JWT_REFRESH_EXPIRES_IN || '7d'
);
const registerUseCase = new RegisterUserUseCase(userRepository, passwordService);
const refreshTokenUseCase = new RefreshTokenUseCase();
const logoutUseCase = new LogoutUseCase();

// Initialize controller
const authController = new AuthController(
  loginUseCase,
  registerUseCase,
  refreshTokenUseCase,
  logoutUseCase
);

// Routes
router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/refresh-token', (req, res) => authController.refreshToken(req, res));
router.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));

export { router as authRoutes };
