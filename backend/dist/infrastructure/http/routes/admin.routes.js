"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.adminRoutes = router;
// Initialize controller
const adminController = new admin_controller_1.AdminController();
// Admin routes (protected, requires authentication)
router.use(auth_middleware_1.authMiddleware);
// User management endpoints for admins
router.get('/users', (req, res) => adminController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => adminController.getUserById(req, res));
router.delete('/users/:id', (req, res) => adminController.deleteUser(req, res));
router.put('/users/:id/role', (req, res) => adminController.changeRole(req, res));
router.post('/users/:id/suspend', (req, res) => adminController.suspendUser(req, res));
// Dashboard stats
router.get('/dashboard/stats', (req, res) => adminController.getDashboardStats(req, res));
//# sourceMappingURL=admin.routes.js.map