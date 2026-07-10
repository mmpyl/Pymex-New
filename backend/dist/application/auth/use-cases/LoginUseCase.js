"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const InvalidCredentialsError_1 = require("../../../domain/user/errors/InvalidCredentialsError");
const JwtService_1 = require("../../../infrastructure/services/JwtService");
class LoginUseCase {
    constructor(userRepository, passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }
    async execute(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new InvalidCredentialsError_1.InvalidCredentialsError();
        }
        if (!user.isActive()) {
            throw new Error(`User account is ${user.getEstado()}`);
        }
        const passwordMatch = await this.passwordService.compare(dto.password, user.getPassword().getValue());
        if (!passwordMatch) {
            throw new InvalidCredentialsError_1.InvalidCredentialsError();
        }
        const userId = user.getId().getValue();
        const userData = {
            id: userId,
            email: user.getEmail().getValue(),
            rol: user.getRol().getValue(),
            empresaId: user.getEmpresaId()
        };
        const accessToken = JwtService_1.JwtService.generateAccessToken(userData);
        const refreshToken = JwtService_1.JwtService.generateRefreshToken(userData);
        return {
            accessToken,
            refreshToken,
            expiresIn: 3600,
            user: {
                id: userId,
                nombre: user.getNombre(),
                email: user.getEmail().getValue(),
                rol: user.getRol().getValue(),
                empresaId: user.getEmpresaId(),
            },
        };
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map