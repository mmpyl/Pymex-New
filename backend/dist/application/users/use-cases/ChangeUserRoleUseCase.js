"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserRoleUseCase = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
const UserNotFoundError_1 = require("../../../domain/user/errors/UserNotFoundError");
class ChangeUserRoleUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId, newRole) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        user.updateRol(newRole);
        await this.userRepository.update(user);
        return UserMapper_1.UserMapper.toResponseDto(user);
    }
}
exports.ChangeUserRoleUseCase = ChangeUserRoleUseCase;
//# sourceMappingURL=ChangeUserRoleUseCase.js.map