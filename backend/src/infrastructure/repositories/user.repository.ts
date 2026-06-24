import { Op } from 'sequelize';
import { User } from '../../domain/user/entities/User';
import { UserId } from '../../domain/user/value-objects/UserId';
import { Email } from '../../domain/user/value-objects/Email';
import { Password } from '../../domain/user/value-objects/Password';
import { UserRole } from '../../domain/user/value-objects/UserRole';
import { IUserRepository } from '../../domain/user/repositories/IUserRepository';
import { sequelize } from '../database/config/sequelize-instance';
import { Model, DataTypes, Optional } from 'sequelize';

interface UserModel extends Model {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  empresa_id?: number;
  estado: string;
  fecha_registro: Date;
}

type UserCreationAttributes = Optional<UserModel, 'id' | 'fecha_registro'>;

export class SequelizeUserRepository implements IUserRepository {
  private userModel: any;

  constructor() {
    this.userModel = sequelize.define<UserModel, UserCreationAttributes>(
      'usuarios_business',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        rol: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        empresa_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'empresas',
            key: 'id',
          },
        },
        estado: {
          type: DataTypes.STRING(10),
          defaultValue: 'activo',
        },
        fecha_registro: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: 'usuarios_business',
        timestamps: false,
        indexes: [
          { fields: ['empresa_id'] },
          { fields: ['email'] },
        ],
      }
    );
  }

  async findById(id: string): Promise<User | null> {
    const userRecord = await this.userModel.findByPk(id);
    if (!userRecord) return null;

    return this.mapToDomain(userRecord);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await this.userModel.findOne({ where: { email } });
    if (!userRecord) return null;

    return this.mapToDomain(userRecord);
  }

  async findByEmpresaId(
    empresaId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.userModel.findAndCountAll({
      where: { empresa_id: empresaId },
      limit,
      offset,
      order: [['fecha_registro', 'DESC']],
    });

    return {
      users: rows.map((record: any) => this.mapToDomain(record)),
      total: count,
    };
  }

  async save(user: User): Promise<void> {
    const props = user.toObject();
    await this.userModel.create({
      id: props.id.getValue(),
      nombre: props.nombre,
      email: props.email.getValue(),
      password: props.password.getValue(),
      rol: props.rol.getValue(),
      empresa_id: props.empresaId,
      estado: props.estado,
      fecha_registro: props.fechaRegistro,
    });
  }

  async update(user: User): Promise<void> {
    const props = user.toObject();
    const record = await this.userModel.findByPk(props.id.getValue());
    if (!record) {
      throw new Error(`User with ID ${props.id.getValue()} not found`);
    }

    await record.update({
      nombre: props.nombre,
      email: props.email.getValue(),
      password: props.password.getValue(),
      rol: props.rol.getValue(),
      empresa_id: props.empresaId,
      estado: props.estado,
    });
  }

  async delete(id: string): Promise<void> {
    const record = await this.userModel.findByPk(id);
    if (!record) {
      throw new Error(`User with ID ${id} not found`);
    }
    await record.destroy();
  }

  async existsByEmail(email: string, excludeId?: string): Promise<boolean> {
    const where: any = { email };
    if (excludeId) {
      where.id = { [Op.ne]: excludeId };
    }
    const record = await this.userModel.findOne({ where });
    return !!record;
  }

  private mapToDomain(record: any): User {
    return User.restore({
      id: UserId.create(record.id),
      nombre: record.nombre,
      email: Email.create(record.email),
      password: Password.create(record.password),
      rol: UserRole.create(record.rol as any),
      empresaId: record.empresa_id,
      estado: record.estado as any,
      fechaRegistro: record.fecha_registro,
    });
  }
}