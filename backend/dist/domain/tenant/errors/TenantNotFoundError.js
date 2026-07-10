"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantNotFoundError = void 0;
class TenantNotFoundError extends Error {
    constructor(tenantId) {
        super(tenantId ? `Tenant with ID ${tenantId} not found` : 'Tenant not found');
        this.name = 'TenantNotFoundError';
    }
}
exports.TenantNotFoundError = TenantNotFoundError;
//# sourceMappingURL=TenantNotFoundError.js.map