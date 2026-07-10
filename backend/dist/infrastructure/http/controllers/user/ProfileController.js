"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const GetUserByIdUseCase_1 = require("../../../../application/users/use-cases/GetUserByIdUseCase");
const UpdateUserProfileUseCase_1 = require("../../../../application/users/use-cases/UpdateUserProfileUseCase");
const user_repository_1 = require("../../../repositories/user.repository");
class ProfileController {
    constructor() {
        this.getProfile = async (req, res) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ error: 'User not authenticated' });
                    return;
                }
                const result = await this.getUserByIdUseCase.execute(userId);
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
                res.status(500).json({ error: error.message || 'Failed to get profile' });
            }
        };
        this.updateProfile = async (req, res) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ error: 'User not authenticated' });
                    return;
                }
                const { nombre, email } = req.body;
                const dto = {
                    id: userId,
                    nombre,
                    email
                };
                const result = await this.updateProfileUseCase.execute(dto);
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
                res.status(500).json({ error: error.message || 'Failed to update profile' });
            }
        };
        const userRepository = new user_repository_1.UserRepository();
        this.getUserByIdUseCase = new GetUserByIdUseCase_1.GetUserByIdUseCase(userRepository);
        this.updateProfileUseCase = new UpdateUserProfileUseCase_1.UpdateUserProfileUseCase(userRepository);
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=ProfileController.js.map