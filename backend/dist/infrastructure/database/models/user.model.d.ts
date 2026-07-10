import { Model, Optional } from 'sequelize';
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
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'fechaRegistro' | 'createdAt' | 'updatedAt'> {
}
export declare class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: string;
    nombre: string;
    email: string;
    password: string;
    rol: UserRoleType;
    empresaId: number | undefined;
    estado: 'activo' | 'inactivo' | 'suspendido';
    fechaRegistro: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
//# sourceMappingURL=user.model.d.ts.map