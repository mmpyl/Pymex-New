"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantId = void 0;
class TenantId {
    constructor(value) {
        this.value = value;
    }
    static create() {
        const id = crypto.randomUUID();
        return new TenantId(id);
    }
    static fromString(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('TenantId cannot be empty');
        }
        return new TenantId(value.trim());
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
}
exports.TenantId = TenantId;
//# sourceMappingURL=TenantId.js.map