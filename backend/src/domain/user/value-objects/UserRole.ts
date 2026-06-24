export type UserRoleType = 'super_admin' | 'admin' | 'soporte' | 'gerente' | 'empleado' | 'contador';

export class UserRole {
  private static readonly VALID_ROLES: UserRoleType[] = [
    'super_admin',
    'admin',
    'soporte',
    'gerente',
    'empleado',
    'contador'
  ];

  private constructor(private readonly value: UserRoleType) {}

  static create(role: UserRoleType): UserRole {
    if (!role || !this.VALID_ROLES.includes(role)) {
      throw new Error(`Invalid role. Must be one of: ${this.VALID_ROLES.join(', ')}`);
    }
    return new UserRole(role);
  }

  getValue(): UserRoleType {
    return this.value;
  }

  equals(other: UserRole): boolean {
    return this.value === other.getValue();
  }

  isAdmin(): boolean {
    return this.value === 'admin' || this.value === 'super_admin';
  }

  isSuperAdmin(): boolean {
    return this.value === 'super_admin';
  }
}