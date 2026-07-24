import { Router } from 'express';
import { UserController } from '../controllers/user/UserController';
import { ProfileController } from '../controllers/user/ProfileController';
import { PasswordController } from '../controllers/user/PasswordController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Initialize controllers
const userController = new UserController();
const profileController = new ProfileController();
const passwordController = new PasswordController();

// User management routes (protected, requires authentication)
router.use(authMiddleware);

// User CRUD routes
router.get('/users', (req, res) => userController.getAll(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

// User role management
router.put('/users/:id/role', (req, res) => userController.changeRole(req, res));

// User suspension
router.post('/users/:id/suspend', (req, res) => userController.suspend(req, res));

// Profile routes
router.get('/profile', (req, res) => profileController.getProfile(req, res));
router.put('/profile', (req, res) => profileController.updateProfile(req, res));

// Password management
router.put('/password/change', (req, res) => passwordController.changePassword(req, res));

export { router as userRoutes };
