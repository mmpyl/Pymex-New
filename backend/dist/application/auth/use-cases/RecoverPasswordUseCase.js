"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordUseCase = void 0;
class RecoverPasswordUseCase {
    constructor() { }
    async execute(_dto) {
        // TODO: Implementar lógica de recuperación de contraseña
        // 1. Buscar usuario por email
        // 2. Generar token de reset
        // 3. Guardar token en DB con expiry
        // 4. Enviar email con link de reset
        return Promise.resolve();
    }
}
exports.RecoverPasswordUseCase = RecoverPasswordUseCase;
//# sourceMappingURL=RecoverPasswordUseCase.js.map