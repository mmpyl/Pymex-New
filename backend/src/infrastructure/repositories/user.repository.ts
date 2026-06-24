import { UserModel } from '../database/models/user.model';
import { IUserRepository } from '../../domain/user/repositories/IUserRepository';
import { User } from '../../domain/user/entities/User';
import { UserId } from '../../domain/user/value-objects/UserId';
import { Email } from '../../domain/user/value-objects/Email';
import { Password } from '../../domain/user/value-objects/Password';
import { UserRole } from '../../domain/user/value-objects/UserRole';
import { UserNotFoundError } from '../../domain/user/errors/UserNotFoundError';
import { Op } from 'sequelize';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const model = await UserModel.findByPk(id);
    if (!model) return null;
    
    return User.restore({
      id: model.id,
      nombre: model.nombre,
      email: model.email,
      password: model.password,
      rol: model.rol,
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await UserModel.findOne({ where: { email } });
    if (!model) return null;
    
    return User.restore({
      id: model.id,
      nombre: model.nombre,
      email: model.email,
      password: model.password,
      rol: model.rol,
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    });
  }

  async save(user: User): Promise<User> {
    const [model] = await UserModel.findOrCreate({
      where: { email: user.getEmail().getValue() },
      defaults: {
        id: user.getId().getValue(),
        nombre: user.getNombre(),
        email: user.getEmail().getValue(),
        password: user.getPassword().getHash(),
        rol: user.getRol().getValue(),
        empresaId: user.getEmpresaId(),
        estado: user.getEstado(),
        fechaRegistro: user.getFechaRegistro(),
      },
    });

    if (!model) {
      throw new Error('Failed to create user');
    }

    await model.update({
      nombre: user.getNombre(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getHash(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId(),
      estado: user.getEstado(),
    });

    return User.restore({
      id: model.id,
      nombre: model.nombre,
      email: model.email,
      password: model.password,
      rol: model.rol,
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    });
  }

  async update(user: User): Promise<User> {
    const model = await UserModel.findByPk(user.getId().getValue());
    if (!model) {
      throw new UserNotFoundError();
    }

    await model.update({
      nombre: user.getNombre(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getHash(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId(),
      estado: user.getEstado(),
    });

    return User.restore({
      id: model.id,
      nombre: model.nombre,
      email: model.email,
      password: model.password,
      rol: model.rol,
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    });
  }

  async delete(id: string): Promise<void> {
    const model = await UserModel.findByPk(id);
    if (!model) {
      throw new UserNotFoundError();
    }
    await model.destroy();
  }

  async existsByEmail(email: string): Promise<boolean> {
    const model = await UserModel.findOne({ where: { email } });
    return !!model;
  }

  async findAll(empresaId?: number): Promise<User[]> {
    const where = empresaId ? { empresaId } : {};
    const models = await UserModel.findAll({ where });
    
    return models.map(model => User.restore({
      id: model.id,
      nombre: model.nombre,
      email: model.email,
      password: model.password,
      rol: model.rol,
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    }));
  }
}
