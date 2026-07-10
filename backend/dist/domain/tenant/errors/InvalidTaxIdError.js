"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTaxIdError = void 0;
class InvalidTaxIdError extends Error {
    constructor(taxId) {
        super(taxId ? `Invalid tax ID: ${taxId}` : 'Invalid tax ID');
        this.name = 'InvalidTaxIdError';
    }
}
exports.InvalidTaxIdError = InvalidTaxIdError;
//# sourceMappingURL=InvalidTaxIdError.js.map