"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/user/UserController");
const ProfileController_1 = require("../controllers/user/ProfileController");
const PasswordController_1 = require("../controllers/user/PasswordController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.userRoutes = router;
// Initialize controllers
const userController = new UserController_1.UserController();
const profileController = new ProfileController_1.ProfileController();
const passwordController = new PasswordController_1.PasswordController();
// User management routes (protected, requires authentication)
router.use(auth_middleware_1.authMiddleware);
// User CRUD routes
router.get('/users', (req, res) => userController.getAll(req, res));
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
//# sourceMappingURL=user.routes.js.map