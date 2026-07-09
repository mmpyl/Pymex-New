import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../../../application/users/use-cases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../../../../application/users/use-cases/GetUserByIdUseCase';
import { UpdateUserProfileUseCase } from '../../../../application/users/use-cases/UpdateUserProfileUseCase';
import { DeleteUserUseCase } from '../../../../application/users/use-cases/DeleteUserUseCase';
import { ChangeUserRoleUseCase } from '../../../../application/users/use-cases/ChangeUserRoleUseCase';
import { SuspendUserUseCase } from '../../../../application/users/use-cases/SuspendUserUseCase';
import { UserRepository } from '../../../repositories/user.repository';
import { UpdateUserDto } from '../../../../application/users/dtos/UpdateUserDto';
import { UserRoleType } from '../../../../domain/user/value-objects/UserRole';

export class UserController {
  private getAllUsersUseCase: GetAllUsersUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private updateProfileUseCase: UpdateUserProfileUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private changeRoleUseCase: ChangeUserRoleUseCase;
  private suspendUserUseCase: SuspendUserUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.updateProfileUseCase = new UpdateUserProfileUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    this.changeRoleUseCase = new ChangeUserRoleUseCase(userRepository);
    this.suspendUserUseCase = new SuspendUserUseCase(userRepository);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { empresaId, page, limit } = req.query;
      const result = await this.getAllUsersUseCase.execute(
        empresaId ? Number(empresaId) : undefined,
        page ? Number(page) : 1,
        limit ? Number(limit) : 10
      );
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to get users' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.getUserByIdUseCase.execute(id);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      if (error.name === 'UserNotFoundError') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Failed to get user' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { nombre, email, rol, empresaId, estado } = req.body;
      
      const dto: UpdateUserDto = {
        id,
        nombre,
        email,
        rol,
        empresaId,
        estado
      };
      
const result = await this.updateProfileUseCase.execute(Number(id), dto);
      
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
      res.status(500).json({ error: error.message || 'Failed to update user' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute(id);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error: any) {
      if (error.name === 'UserNotFoundError') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Failed to delete user' });
    }
  };

  changeRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { newRole } = req.body;
      
      if (!newRole) {
        res.status(400).json({ error: 'newRole is required' });
        return;
      }
      
      const result = await this.changeRoleUseCase.execute(id, newRole as UserRoleType);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      if (error.name === 'UserNotFoundError') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Failed to change role' });
    }
  };

  suspend = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.suspendUserUseCase.execute(id);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      if (error.name === 'UserNotFoundError') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || 'Failed to suspend user' });
    }
  };
}
