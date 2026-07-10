"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantName = void 0;
class TenantName {
    constructor(value) {
        this.value = value;
    }
    static create(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('Tenant name cannot be empty');
        }
        const trimmed = name.trim();
        if (trimmed.length < 3) {
            throw new Error('Tenant name must be at least 3 characters long');
        }
        if (trimmed.length > 100) {
            throw new Error('Tenant name must not exceed 100 characters');
        }
        return new TenantName(trimmed);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
}
exports.TenantName = TenantName;
//# sourceMappingURL=TenantName.js.map