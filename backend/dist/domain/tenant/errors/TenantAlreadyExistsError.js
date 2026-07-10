"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantAlreadyExistsError = void 0;
class TenantAlreadyExistsError extends Error {
    constructor(identifier) {
        super(identifier ? `Tenant with identifier ${identifier} already exists` : 'Tenant already exists');
        this.name = 'TenantAlreadyExistsError';
    }
}
exports.TenantAlreadyExistsError = TenantAlreadyExistsError;
//# sourceMappingURL=TenantAlreadyExistsError.js.map