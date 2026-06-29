import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Initialize controller
const adminController = new AdminController();

// Admin routes (protected, requires authentication)
router.use(authMiddleware);

// User management endpoints for admins
router.get('/users', (req, res) => adminController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => adminController.getUserById(req, res));
router.delete('/users/:id', (req, res) => adminController.deleteUser(req, res));
router.put('/users/:id/role', (req, res) => adminController.changeRole(req, res));
router.post('/users/:id/suspend', (req, res) => adminController.suspendUser(req, res));

// Dashboard stats
router.get('/dashboard/stats', (req, res) => adminController.getDashboardStats(req, res));

export { router as adminRoutes };
