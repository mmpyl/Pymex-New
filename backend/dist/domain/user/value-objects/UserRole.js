"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
class UserRole {
    constructor(value) {
        this.value = value;
    }
    static create(role) {
        if (!role || !this.VALID_ROLES.includes(role)) {
            throw new Error(`Invalid role. Must be one of: ${this.VALID_ROLES.join(', ')}`);
        }
        return new UserRole(role);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
    isAdmin() {
        return this.value === 'admin' || this.value === 'super_admin';
    }
    isSuperAdmin() {
        return this.value === 'super_admin';
    }
}
exports.UserRole = UserRole;
UserRole.VALID_ROLES = [
    'super_admin',
    'admin',
    'soporte',
    'gerente',
    'empleado',
    'contador'
];
//# sourceMappingURL=UserRole.js.map