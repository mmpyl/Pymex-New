import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { UserRole, UserRoleType } from '../value-objects/UserRole';
export interface UserProps {
    id: UserId;
    nombre: string;
    email: Email;
    password: Password;
    rol: UserRole;
    empresaId?: number;
    estado: 'activo' | 'inactivo' | 'suspendido';
    fechaRegistro: Date;
}
export declare class User {
    private props;
    private constructor();
    static create(props: Omit<UserProps, 'id' | 'fechaRegistro'>): User;
    static restore(props: UserProps): User;
    getId(): UserId;
    getNombre(): string;
    getEmail(): Email;
    getPassword(): Password;
    getRol(): UserRole;
    getEmpresaId(): number | undefined;
    getEstado(): UserProps['estado'];
    getFechaRegistro(): Date;
    updateNombre(nombre: string): void;
    updateEmail(email: string): void;
    updatePassword(password: string): void;
    updateRol(rol: UserRoleType): void;
    activate(): void;
    deactivate(): void;
    suspend(): void;
    isActive(): boolean;
    isSuspended(): boolean;
    isAdmin(): boolean;
    isSuperAdmin(): boolean;
    toObject(): UserProps;
}
//# sourceMappingURL=User.d.ts.map