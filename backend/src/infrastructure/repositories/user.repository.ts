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

  private toDomain(model: UserModel): User {
    return User.restore({
      id: UserId.create(String(model.id)),
      nombre: model.nombre,
      email: Email.create(String(model.email)),
      password: Password.fromHash(String(model.password)),
      rol: UserRole.create(model.rol),
      empresaId: model.empresaId,
      estado: model.estado,
      fechaRegistro: model.fechaRegistro,
    });
  }
  async findById(id: string): Promise<User | null> {
    const model = await UserModel.findByPk(id);
    if (!model) return null;
    return this.toDomain(model);
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await UserModel.findOne({ where: { email } });
    if (!model) return null;
    return this.toDomain(model);
  }

  async findByEmpresaId(empresaId: number, page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await UserModel.findAndCountAll({
      where: { empresaId },
      offset,
      limit,
    });
    const users = rows.map(model => this.toDomain(model));

    return { users, total: count };
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await UserModel.findAndCountAll({
      offset,
      limit,
      order: [['fechaRegistro', 'DESC']],
    });

    return { users: rows.map(model => this.toDomain(model)), total: count };
  }

  async save(user: User): Promise<void> {
    await UserModel.findOrCreate({
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
  }

  async update(user: User): Promise<void> {
    const model = await UserModel.findByPk(user.getId().getValue());
    if (!model) {
      throw new UserNotFoundError(user.getId().getValue());
    }

    await model.update({
      nombre: user.getNombre(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getHash(),
      rol: user.getRol().getValue(),
      empresaId: user.getEmpresaId(),
      estado: user.getEstado(),
    });
  }

  async delete(id: string): Promise<void> {
    const model = await UserModel.findByPk(id);
    if (!model) {
      throw new UserNotFoundError(id);
    }
    await model.destroy();
  }

  async existsByEmail(email: string, excludeId?: string): Promise<boolean> {
    const where: any = { email };
    if (excludeId) {
      where.id = { [Op.ne]: excludeId };
    }
    const model = await UserModel.findOne({ where });
    return !!model;
  }
}

