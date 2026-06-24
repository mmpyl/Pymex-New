import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize-instance';
import { UserRoleType } from '../../../domain/user/value-objects/UserRole';

interface UserAttributes {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: UserRoleType;
  empresaId?: number;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaRegistro: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'fechaRegistro' | 'createdAt' | 'updatedAt'> {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public rol!: UserRoleType;
  public empresaId!: number | undefined;
  public estado!: 'activo' | 'inactivo' | 'suspendido';
  public fechaRegistro!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
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
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('super_admin', 'admin', 'soporte', 'gerente', 'empleado', 'contador'),
      allowNull: false,
      defaultValue: 'empleado',
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tenants',
        key: 'id',
      },
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo', 'suspendido'),
      allowNull: false,
      defaultValue: 'activo',
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);
