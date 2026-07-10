"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_repository_1 = require("../../repositories/user.repository");
const GetAllUsersUseCase_1 = require("../../../application/users/use-cases/GetAllUsersUseCase");
const GetUserByIdUseCase_1 = require("../../../application/users/use-cases/GetUserByIdUseCase");
const DeleteUserUseCase_1 = require("../../../application/users/use-cases/DeleteUserUseCase");
const ChangeUserRoleUseCase_1 = require("../../../application/users/use-cases/ChangeUserRoleUseCase");
const SuspendUserUseCase_1 = require("../../../application/users/use-cases/SuspendUserUseCase");
class AdminController {
    constructor() {
        const userRepository = new user_repository_1.UserRepository();
        this.getAllUsersUseCase = new GetAllUsersUseCase_1.GetAllUsersUseCase(userRepository);
        this.getUserByIdUseCase = new GetUserByIdUseCase_1.GetUserByIdUseCase(userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(userRepository);
        this.changeUserRoleUseCase = new ChangeUserRoleUseCase_1.ChangeUserRoleUseCase(userRepository);
        this.suspendUserUseCase = new SuspendUserUseCase_1.SuspendUserUseCase(userRepository);
    }
    async getAllUsers(req, res) {
        try {
            const { empresaId, page, limit } = req.query;
            const result = await this.getAllUsersUseCase.execute(empresaId ? Number(empresaId) : undefined, page ? Number(page) : 1, limit ? Number(limit) : 10);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.getUserByIdUseCase.execute(Number(id));
            res.status(200).json(user);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await this.deleteUserUseCase.execute(Number(id));
            res.status(204).send();
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
        }
    }
    async changeRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            if (!role) {
                res.status(400).json({ error: 'Role is required' });
                return;
            }
            const updatedUser = await this.changeUserRoleUseCase.execute(Number(id), role);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
        }
    }
    async suspendUser(req, res) {
        try {
            const { id } = req.params;
            const { reason } = req.body;
            const updatedUser = await this.suspendUserUseCase.execute(Number(id), reason || 'No reason provided');
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
        }
    }
    // Placeholder for other admin functionalities
    async getDashboardStats(req, res) {
        res.status(200).json({
            message: 'Dashboard stats endpoint - to be implemented',
            stats: {
                totalUsers: 0,
                totalTenants: 0,
                activeSubscriptions: 0
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map