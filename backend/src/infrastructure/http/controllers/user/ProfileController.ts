import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../../../application/users/use-cases/GetUserByIdUseCase';
import { UpdateUserProfileUseCase } from '../../../../application/users/use-cases/UpdateUserProfileUseCase';
import { UserRepository } from '../../../repositories/user.repository';
import { UpdateUserDto } from '../../../../application/users/dtos/UpdateUserDto';

export class ProfileController {
  private getUserByIdUseCase: GetUserByIdUseCase;
  private updateProfileUseCase: UpdateUserProfileUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.updateProfileUseCase = new UpdateUserProfileUseCase(userRepository);
  }

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      
      const result = await this.getUserByIdUseCase.execute(userId);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      if (error.name === 'UserNotFoundError') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Failed to get profile' });
    }
  };

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      
      const { nombre, email } = req.body;
      
      const dto: UpdateUserDto = {
        id: userId,
        nombre,
        email
      };
      
      const result = await this.updateProfileUseCase.execute(dto);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
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
}
