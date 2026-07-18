"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const user_repository_1 = require("../../repositories/user.repository");
const BcryptPasswordService_1 = require("../../services/BcryptPasswordService");
const LoginUseCase_1 = require("../../../application/auth/use-cases/LoginUseCase");
const RegisterUserUseCase_1 = require("../../../application/auth/use-cases/RegisterUserUseCase");
const RefreshTokenUseCase_1 = require("../../../application/auth/use-cases/RefreshTokenUseCase");
const LogoutUseCase_1 = require("../../../application/auth/use-cases/LogoutUseCase");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.authRoutes = router;
// Initialize dependencies
const userRepository = new user_repository_1.UserRepository();
const passwordService = new BcryptPasswordService_1.BcryptPasswordService();
// Initialize use cases
const loginUseCase = new LoginUseCase_1.LoginUseCase(userRepository, passwordService);
const registerUseCase = new RegisterUserUseCase_1.RegisterUserUseCase(userRepository, passwordService);
const refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase();
const logoutUseCase = new LogoutUseCase_1.LogoutUseCase();
// Initialize controller
const authController = new auth_controller_1.AuthController(loginUseCase, registerUseCase, refreshTokenUseCase, logoutUseCase);
// Routes
router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/refresh-token', (req, res) => authController.refreshToken(req, res));
router.post('/logout', auth_middleware_1.authMiddleware, (req, res) => authController.logout(req, res));
//# sourceMappingURL=auth.routes.js.map