import { Request, Response } from 'express';
import { UserRepository } from '../../../repositories/user.repository';
import { BcryptPasswordService } from '../../../services/BcryptPasswordService';
import { UpdateUserProfileUseCase } from '../../../../application/users/use-cases/UpdateUserProfileUseCase';
import { GetUserByIdUseCase } from '../../../../application/users/use-cases/GetUserByIdUseCase';

export class ProfileController {
  private updateProfileUseCase: UpdateUserProfileUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;

  constructor() {
    const userRepository = new UserRepository();
    const passwordService = new BcryptPasswordService();

    this.updateProfileUseCase = new UpdateUserProfileUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Assuming user ID is available in req.user from auth middleware
      const userId = (req.user as any)?.userId;
      
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const user = await this.getUserByIdUseCase.execute(userId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      // Assuming user ID is available in req.user from auth middleware
      const userId = (req.user as any)?.userId;
      
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const updateData = req.body;
      const updatedUser = await this.updateProfileUseCase.execute(userId, updateData);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }
}
