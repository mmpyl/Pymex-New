"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdUseCase = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
const UserNotFoundError_1 = require("../../../domain/user/errors/UserNotFoundError");
class GetUserByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        return UserMapper_1.UserMapper.toResponseDto(user);
    }
}
exports.GetUserByIdUseCase = GetUserByIdUseCase;
//# sourceMappingURL=GetUserByIdUseCase.js.map