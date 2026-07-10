"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(loginUseCase, registerUseCase, refreshTokenUseCase, logoutUseCase) {
        this.loginUseCase = loginUseCase;
        this.registerUseCase = registerUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.logoutUseCase = logoutUseCase;
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ error: 'Email and password are required' });
                    return;
                }
                const dto = { email, password };
                const result = await this.loginUseCase.execute(dto);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                if (error.name === 'InvalidCredentialsError') {
                    res.status(401).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Login failed' });
            }
        };
        this.register = async (req, res) => {
            try {
                const { nombre, email, password, rol, empresaId } = req.body;
                if (!nombre || !email || !password) {
                    res.status(400).json({ error: 'Nombre, email and password are required' });
                    return;
                }
                const dto = { nombre, email, password, rol, empresaId };
                const result = await this.registerUseCase.execute(dto);
                res.status(201).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                if (error.message === 'Email already registered') {
                    res.status(409).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Registration failed' });
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) {
                    res.status(400).json({ error: 'Refresh token is required' });
                    return;
                }
                const dto = { refreshToken };
                const result = await this.refreshTokenUseCase.execute(dto);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(401).json({ error: error.message || 'Token refresh failed' });
            }
        };
        this.logout = async (_req, res) => {
            try {
                await this.logoutUseCase.execute();
                res.status(200).json({
                    success: true,
                    message: 'Logout successful'
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message || 'Logout failed' });
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map