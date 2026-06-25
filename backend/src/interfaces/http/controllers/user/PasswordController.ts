import { Request, Response } from 'express';
import { UserRepository } from '../../../../infrastructure/repositories/user.repository';
import { BcryptPasswordService } from '../../../../infrastructure/services/BcryptPasswordService';

export class PasswordController {
  private userRepository: UserRepository;
  private passwordService: BcryptPasswordService;

  constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new BcryptPasswordService();
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { currentPassword, newPassword } = req.body;

      if (!userId || !currentPassword || !newPassword) {
        res.status(400).json({ 
          success: false, 
          error: 'Current password and new password are required' 
        });
        return;
      }

      const user = await this.userRepository.findById(userId);
      
      if (!user) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }

      // Verify current password
      const passwordMatch = await this.passwordService.compare(
        currentPassword,
        user.getPassword().getValue()
      );

      if (!passwordMatch) {
        res.status(401).json({ success: false, error: 'Current password is incorrect' });
        return;
      }

      // Update password
      user.updatePassword(newPassword);
      await this.userRepository.update(user);

      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
