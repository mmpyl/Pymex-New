export type UserRoleType = 'super_admin' | 'admin' | 'soporte' | 'gerente' | 'empleado' | 'contador';
export declare class UserRole {
    private readonly value;
    private static readonly VALID_ROLES;
    private constructor();
    static create(role: UserRoleType): UserRole;
    getValue(): UserRoleType;
    equals(other: UserRole): boolean;
    isAdmin(): boolean;
    isSuperAdmin(): boolean;
}
//# sourceMappingURL=UserRole.d.ts.map