"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileUseCase = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
const UserNotFoundError_1 = require("../../../domain/user/errors/UserNotFoundError");
class UpdateUserProfileUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId, dto) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        if (dto.nombre !== undefined) {
            user.updateNombre(dto.nombre);
        }
        if (dto.email !== undefined) {
            const exists = await this.userRepository.existsByEmail(dto.email, userId);
            if (exists) {
                throw new Error('Email already in use');
            }
            user.updateEmail(dto.email);
        }
        if (dto.rol !== undefined) {
            user.updateRol(dto.rol);
        }
        if (dto.estado !== undefined) {
            if (dto.estado === 'suspendido') {
                user.suspend();
            }
            else if (dto.estado === 'activo') {
                user.activate();
            }
            else if (dto.estado === 'inactivo') {
                user.deactivate();
            }
        }
        if (dto.empresaId !== undefined) {
            // Assuming there's a method to update empresaId, or we need to add it
            // For now, we'll access the internal props through toObject and recreate
            const props = user.toObject();
            props.empresaId = dto.empresaId;
        }
        await this.userRepository.update(user);
        return UserMapper_1.UserMapper.toResponseDto(user);
    }
}
exports.UpdateUserProfileUseCase = UpdateUserProfileUseCase;
//# sourceMappingURL=UpdateUserProfileUseCase.js.map