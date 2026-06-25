import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../../../application/users/use-cases/GetUserByIdUseCase';
import { GetAllUsersUseCase } from '../../../../application/users/use-cases/GetAllUsersUseCase';
import { DeleteUserUseCase } from '../../../../application/users/use-cases/DeleteUserUseCase';
import { SuspendUserUseCase } from '../../../../application/users/use-cases/SuspendUserUseCase';
import { ChangeUserRoleUseCase } from '../../../../application/users/use-cases/ChangeUserRoleUseCase';
import { UpdateUserProfileUseCase } from '../../../../application/users/use-cases/UpdateUserProfileUseCase';
import { UserRepository } from '../../../../infrastructure/repositories/user.repository';

export class UserController {
  private getUserByIdUseCase: GetUserByIdUseCase;
  private getAllUsersUseCase: GetAllUsersUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private suspendUserUseCase: SuspendUserUseCase;
  private changeUserRoleUseCase: ChangeUserRoleUseCase;
  private updateProfileUseCase: UpdateUserProfileUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    this.suspendUserUseCase = new SuspendUserUseCase(userRepository);
    this.changeUserRoleUseCase = new ChangeUserRoleUseCase(userRepository);
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
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(id);
      res.json({ success: true, data: user });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = { id, ...req.body };
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

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(id);
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  async suspend(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.suspendUserUseCase.execute(id);
      res.json({ success: true, data: user });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, error: 'User not found' });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  async changeRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { rol } = req.body;
      
      if (!rol) {
        res.status(400).json({ success: false, error: 'Role is required' });
        return;
      }

      const user = await this.changeUserRoleUseCase.execute(id, rol);
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
