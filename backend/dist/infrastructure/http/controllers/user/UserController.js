"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const GetAllUsersUseCase_1 = require("../../../../application/users/use-cases/GetAllUsersUseCase");
const GetUserByIdUseCase_1 = require("../../../../application/users/use-cases/GetUserByIdUseCase");
const UpdateUserProfileUseCase_1 = require("../../../../application/users/use-cases/UpdateUserProfileUseCase");
const DeleteUserUseCase_1 = require("../../../../application/users/use-cases/DeleteUserUseCase");
const ChangeUserRoleUseCase_1 = require("../../../../application/users/use-cases/ChangeUserRoleUseCase");
const SuspendUserUseCase_1 = require("../../../../application/users/use-cases/SuspendUserUseCase");
const CreateUserUseCase_1 = require("../../../../application/users/use-cases/CreateUserUseCase");
const user_repository_1 = require("../../../repositories/user.repository");
const BcryptPasswordService_1 = require("../../../services/BcryptPasswordService");
class UserController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { nombre, email, password, rol, empresaId } = req.body;
                if (!nombre || !email || !password) {
                    res.status(400).json({ error: 'Nombre, email and password are required' });
                    return;
                }
                const dto = { nombre, email, password, rol, empresaId };
                const result = await this.createUserUseCase.execute(dto);
                res.status(201).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                if (error.message === 'Email already registered') {
                    res.status(409).json({ error: error.message });
                    return;
                }
                res.status(400).json({ error: error.message || 'Failed to create user' });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const { empresaId, page, limit } = req.query;
                const result = await this.getAllUsersUseCase.execute(empresaId ? Number(empresaId) : undefined, page ? Number(page) : 1, limit ? Number(limit) : 10);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message || 'Failed to get users' });
            }
        };
        this.getById = async (req, res) => {
            try {
                const { id } = req.params;
                const result = await this.getUserByIdUseCase.execute(id);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                if (error.name === 'UserNotFoundError') {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Failed to get user' });
            }
        };
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const { nombre, email, rol, empresaId, estado } = req.body;
                const dto = {
                    id,
                    nombre,
                    email,
                    rol,
                    empresaId,
                    estado
                };
                const result = await this.updateProfileUseCase.execute(id, dto);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                if (error.name === 'UserNotFoundError') {
                    res.status(404).json({ error: error.message });
                    return;
                }
                if (error.message === 'Email already in use') {
                    res.status(409).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Failed to update user' });
            }
        };
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                await this.deleteUserUseCase.execute(id);
                res.status(200).json({
                    success: true,
                    message: 'User deleted successfully'
                });
            }
            catch (error) {
                if (error.name === 'UserNotFoundError') {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Failed to delete user' });
            }
        };
        this.changeRole = async (req, res) => {
            try {
                const { id } = req.params;
                const { newRole } = req.body;
                if (!newRole) {
                    res.status(400).json({ error: 'newRole is required' });
                    return;
                }
                const result = await this.changeRoleUseCase.execute(id, newRole);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                if (error.name === 'UserNotFoundError') {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Failed to change role' });
            }
        };
        this.suspend = async (req, res) => {
            try {
                const { id } = req.params;
                const result = await this.suspendUserUseCase.execute(id);
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
            catch (error) {
                if (error.name === 'UserNotFoundError') {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Failed to suspend user' });
            }
        };
        const userRepository = new user_repository_1.UserRepository();
        const passwordService = new BcryptPasswordService_1.BcryptPasswordService();
        this.getAllUsersUseCase = new GetAllUsersUseCase_1.GetAllUsersUseCase(userRepository);
        this.getUserByIdUseCase = new GetUserByIdUseCase_1.GetUserByIdUseCase(userRepository);
        this.updateProfileUseCase = new UpdateUserProfileUseCase_1.UpdateUserProfileUseCase(userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(userRepository);
        this.changeRoleUseCase = new ChangeUserRoleUseCase_1.ChangeUserRoleUseCase(userRepository);
        this.suspendUserUseCase = new SuspendUserUseCase_1.SuspendUserUseCase(userRepository);
        this.createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository, passwordService);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map