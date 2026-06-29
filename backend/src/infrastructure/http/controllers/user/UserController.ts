import { Request, Response } from 'express';
import { UserRepository } from '../../../repositories/user.repository';
import { BcryptPasswordService } from '../../../services/BcryptPasswordService';
import { GetAllUsersUseCase } from '../../../../application/users/use-cases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../../../../application/users/use-cases/GetUserByIdUseCase';
import { DeleteUserUseCase } from '../../../../application/users/use-cases/DeleteUserUseCase';
import { ChangeUserRoleUseCase } from '../../../../application/users/use-cases/ChangeUserRoleUseCase';
import { SuspendUserUseCase } from '../../../../application/users/use-cases/SuspendUserUseCase';
import { UpdateUserProfileUseCase } from '../../../../application/users/use-cases/UpdateUserProfileUseCase';

export class UserController {
  private getAllUsersUseCase: GetAllUsersUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private changeUserRoleUseCase: ChangeUserRoleUseCase;
  private suspendUserUseCase: SuspendUserUseCase;
  private updateProfileUseCase: UpdateUserProfileUseCase;

  constructor() {
    const userRepository = new UserRepository();
    const passwordService = new BcryptPasswordService();

    this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    this.changeUserRoleUseCase = new ChangeUserRoleUseCase(userRepository);
    this.suspendUserUseCase = new SuspendUserUseCase(userRepository);
    this.updateProfileUseCase = new UpdateUserProfileUseCase(userRepository);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { empresaId, page, limit } = req.query;
      const result = await this.getAllUsersUseCase.execute(
        empresaId ? Number(empresaId) : undefined,
        page ? Number(page) : 1,
        limit ? Number(limit) : 10
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(Number(id));
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const updateData = req.body;
      
      const updatedUser = await this.updateProfileUseCase.execute(userId, updateData);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async changeRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      
      if (!role) {
        res.status(400).json({ error: 'Role is required' });
        return;
      }

      const updatedUser = await this.changeUserRoleUseCase.execute(Number(id), role);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async suspend(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      
      const updatedUser = await this.suspendUserUseCase.execute(Number(id), reason || 'No reason provided');
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }
}
