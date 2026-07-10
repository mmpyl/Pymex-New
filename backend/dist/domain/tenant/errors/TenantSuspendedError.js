"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSuspendedError = void 0;
class TenantSuspendedError extends Error {
    constructor(tenantId) {
        super(tenantId ? `Tenant with ID ${tenantId} is suspended` : 'Tenant is suspended');
        this.name = 'TenantSuspendedError';
    }
}
exports.TenantSuspendedError = TenantSuspendedError;
//# sourceMappingURL=TenantSuspendedError.js.map