"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordController = void 0;
const user_repository_1 = require("../../../repositories/user.repository");
const BcryptPasswordService_1 = require("../../../services/BcryptPasswordService");
const UserNotFoundError_1 = require("../../../../domain/user/errors/UserNotFoundError");
class PasswordController {
    constructor() {
        this.changePassword = async (req, res) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ error: 'User not authenticated' });
                    return;
                }
                const { currentPassword, newPassword } = req.body;
                if (!currentPassword || !newPassword) {
                    res.status(400).json({ error: 'Current password and new password are required' });
                    return;
                }
                const user = await this.userRepository.findById(userId);
                if (!user) {
                    throw new UserNotFoundError_1.UserNotFoundError(userId);
                }
                const isValid = await this.passwordService.compare(currentPassword, user.getPassword().getHash());
                if (!isValid) {
                    res.status(401).json({ error: 'Current password is incorrect' });
                    return;
                }
                user.updatePassword(newPassword);
                await this.userRepository.update(user);
                res.status(200).json({
                    success: true,
                    message: 'Password changed successfully'
                });
            }
            catch (error) {
                if (error.name === 'UserNotFoundError') {
                    res.status(404).json({ error: error.message });
                    return;
                }
                res.status(500).json({ error: error.message || 'Failed to change password' });
            }
        };
        this.userRepository = new user_repository_1.UserRepository();
        this.passwordService = new BcryptPasswordService_1.BcryptPasswordService();
    }
}
exports.PasswordController = PasswordController;
//# sourceMappingURL=PasswordController.js.map