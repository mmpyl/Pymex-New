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
        // If no empresaId, get all users (for super admin)
        const allUsers = [];
        let currentPage = 1;
        const pageSize = 100;
        while (true) {
            const result = await this.userRepository.findByEmpresaId(0, currentPage, pageSize);
            if (result.users.length === 0)
                break;
            allUsers.push(...result.users);
            if (result.users.length < pageSize)
                break;
            currentPage++;
        }
        const paginatedUsers = allUsers.slice((page - 1) * limit, page * limit);
        return {
            users: UserMapper_1.UserMapper.toResponseDtoList(paginatedUsers),
            total: allUsers.length,
        };
    }
}
exports.GetAllUsersUseCase = GetAllUsersUseCase;
//# sourceMappingURL=GetAllUsersUseCase.js.map