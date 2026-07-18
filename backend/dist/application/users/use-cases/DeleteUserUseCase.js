"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
const UserNotFoundError_1 = require("../../../domain/user/errors/UserNotFoundError");
class DeleteUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError(id);
        }
        await this.userRepository.delete(id);
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
//# sourceMappingURL=DeleteUserUseCase.js.map