"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const JwtService_1 = require("../../../infrastructure/services/JwtService");
class RefreshTokenUseCase {
    async execute(dto) {
        try {
            const decoded = JwtService_1.JwtService.verifyRefreshToken(dto.refreshToken);
            const userData = {
                userId: decoded.userId,
                id: decoded.userId,
                email: decoded.email,
                rol: decoded.rol,
                empresaId: decoded.empresaId
            };
            const accessToken = JwtService_1.JwtService.generateAccessToken(userData);
            const refreshToken = JwtService_1.JwtService.generateRefreshToken(userData);
            return {
                accessToken,
                refreshToken,
                expiresIn: 3600,
                user: {
                    id: decoded.userId,
                    nombre: '',
                    email: decoded.email,
                    rol: decoded.rol,
                    empresaId: decoded.empresaId
                }
            };
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }
}
exports.RefreshTokenUseCase = RefreshTokenUseCase;
//# sourceMappingURL=RefreshTokenUseCase.js.map