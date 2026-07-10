"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantStatus = void 0;
class TenantStatus {
    constructor(value) {
        this.value = value;
    }
    static create(status) {
        if (!status || !TenantStatus.VALID_STATUSES.includes(status)) {
            throw new Error(`Invalid tenant status. Valid values are: ${TenantStatus.VALID_STATUSES.join(', ')}`);
        }
        return new TenantStatus(status);
    }
    static active() {
        return new TenantStatus('activo');
    }
    static suspended() {
        return new TenantStatus('suspendido');
    }
    static inactive() {
        return new TenantStatus('inactivo');
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
    isActive() {
        return this.value === 'activo';
    }
    isSuspended() {
        return this.value === 'suspendido';
    }
    isInactive() {
        return this.value === 'inactivo';
    }
}
exports.TenantStatus = TenantStatus;
TenantStatus.VALID_STATUSES = ['activo', 'suspendido', 'inactivo'];
//# sourceMappingURL=TenantStatus.js.map