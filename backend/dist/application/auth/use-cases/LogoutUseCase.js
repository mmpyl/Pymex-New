"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUseCase = void 0;
class LogoutUseCase {
    constructor() { }
    async execute() {
        // En una implementación con JWT stateless, el logout se maneja en el cliente
        // eliminando los tokens. Si se usa blacklist de tokens, aquí se agregaría
        // el token a la blacklist en Redis.
        return Promise.resolve();
    }
}
exports.LogoutUseCase = LogoutUseCase;
//# sourceMappingURL=LogoutUseCase.js.map