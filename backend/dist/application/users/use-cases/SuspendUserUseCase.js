"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspendUserUseCase = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
const UserNotFoundError_1 = require("../../../domain/user/errors/UserNotFoundError");
class SuspendUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        user.suspend();
        await this.userRepository.update(user);
        return UserMapper_1.UserMapper.toResponseDto(user);
    }
}
exports.SuspendUserUseCase = SuspendUserUseCase;
//# sourceMappingURL=SuspendUserUseCase.js.map