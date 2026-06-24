import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

export function createAuthRoutes(
  authController: AuthController,
  authMiddleware: AuthMiddleware
): Router {
  const router = Router();

  router.post('/login', authController.login);
  router.post('/register', authController.register);
  router.post('/refresh-token', authController.refreshToken);
  router.post('/logout', authMiddleware.authenticate, authController.logout);

  return router;
}
