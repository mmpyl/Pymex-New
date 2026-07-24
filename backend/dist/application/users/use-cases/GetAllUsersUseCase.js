"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersUseCase = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
class GetAllUsersUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(empresaId, page = 1, limit = 10) {
        if (empresaId) {
            const result = await this.userRepository.findByEmpresaId(empresaId, page, limit);
            return {
                users: UserMapper_1.UserMapper.toResponseDtoList(result.users),
                total: result.total,
            };
        }
        const result = await this.userRepository.findAll(page, limit);
        return {
            users: UserMapper_1.UserMapper.toResponseDtoList(result.users),
            total: result.total,
        };
    }
}
exports.GetAllUsersUseCase = GetAllUsersUseCase;
//# sourceMappingURL=GetAllUsersUseCase.js.map