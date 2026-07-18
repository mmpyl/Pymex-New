import { Request, Response } from 'express';
import { UserRepository } from '../../repositories/user.repository';
import { GetAllUsersUseCase } from '../../../application/users/use-cases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../../../application/users/use-cases/GetUserByIdUseCase';
import { DeleteUserUseCase } from '../../../application/users/use-cases/DeleteUserUseCase';
import { ChangeUserRoleUseCase } from '../../../application/users/use-cases/ChangeUserRoleUseCase';
import { SuspendUserUseCase } from '../../../application/users/use-cases/SuspendUserUseCase';

export class AdminController {
  private getAllUsersUseCase: GetAllUsersUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private changeUserRoleUseCase: ChangeUserRoleUseCase;
  private suspendUserUseCase: SuspendUserUseCase;

  constructor() {
    const userRepository = new UserRepository();

    this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    this.changeUserRoleUseCase = new ChangeUserRoleUseCase(userRepository);
    this.suspendUserUseCase = new SuspendUserUseCase(userRepository);
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
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

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(id);
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

      const updatedUser = await this.changeUserRoleUseCase.execute(id, role);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  async suspendUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const updatedUser = await this.suspendUserUseCase.execute(id);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
  }

  // Placeholder for other admin functionalities
  async getDashboardStats(res: Request, res: Response): Promise<void> {
    res.status(200).json({ 
      message: 'Dashboard stats endpoint - to be implemented',
      stats: {
        totalUsers: 0,
        totalTenants: 0,
        activeSubscriptions: 0
      }
    });
  }
}