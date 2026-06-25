import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../../../application/users/use-cases/GetUserByIdUseCase';
import { UpdateUserProfileUseCase } from '../../../../application/users/use-cases/UpdateUserProfileUseCase';
import { UserRepository } from '../../../../infrastructure/repositories/user.repository';

export class ProfileController {
  private getUserByIdUseCase: GetUserByIdUseCase;
  private updateProfileUseCase: UpdateUserProfileUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.updateProfileUseCase = new UpdateUserProfileUseCase(userRepository);
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const user = await this.getUserByIdUseCase.execute(userId);
      res.json({ success: true, data: user });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const updateData = { id: userId, ...req.body };
      const user = await this.updateProfileUseCase.execute(updateData);
      res.json({ success: true, data: user });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }
}
