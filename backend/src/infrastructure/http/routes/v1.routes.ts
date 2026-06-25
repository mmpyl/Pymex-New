import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('', userRoutes);

export { router as v1Routes };
