import { Request, Response } from 'express';
import { UserRepository } from '../../../repositories/user.repository';
import { BcryptPasswordService } from '../../../services/BcryptPasswordService';
import { UserNotFoundError } from '../../../../domain/user/errors/UserNotFoundError';

export class PasswordController {
  private userRepository: UserRepository;
  private passwordService: BcryptPasswordService;

  constructor() {
    this.userRepository = new UserRepository();
    this.passwordService = new BcryptPasswordService();
  }

  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      
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
        throw new UserNotFoundError();
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
    } catch (error: any) {
      if (error.name === 'UserNotFoundError') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Failed to change password' });
    }
  };
}
