import { Request, Response } from 'express';
import { UserRepository } from '../../../repositories/user.repository';
import { BcryptPasswordService } from '../../../services/BcryptPasswordService';

export class PasswordController {
  constructor(
    private userRepository: UserRepository = new UserRepository(),
    private passwordService: BcryptPasswordService = new BcryptPasswordService()
  ) {}

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      // Assuming user ID is available in req.user from auth middleware
      const userId = (req.user as any)?.userId;
      
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({ error: 'Current password and new password are required' });
        return;
      }

      // Get user from repository
      const user = await this.userRepository.findById(userId);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Verify current password
      // Note: This assumes the user entity has a password field that can be compared
      // You may need to adjust this based on your actual implementation
      const userProps = user.toObject();
      
      // Compare passwords (adjust based on your actual implementation)
      // This is a simplified version - you may need to access the password differently
      const isValid = await this.passwordService.compare(currentPassword, userProps.password || '');
      
      if (!isValid) {
        res.status(401).json({ error: 'Current password is incorrect' });
        return;
      }

      // Hash new password
      const hashedPassword = await this.passwordService.hash(newPassword);
      
      // Update user password
      // Note: You may need a specific method to update password or use the update method
      // This is a simplified version
      const props = user.toObject();
      props.password = hashedPassword;
      
      // Update in repository (you may need a specific method for this)
      await this.userRepository.update(user);

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }
}
