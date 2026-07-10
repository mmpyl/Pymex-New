"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
class Password {
    constructor(value) {
        this.value = value;
    }
    static create(password) {
        if (!password || password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            throw new Error('Password must contain uppercase, lowercase, number and special character');
        }
        return new Password(password);
    }
    static fromHash(hash) {
        return new Password(hash);
    }
    getValue() {
        return this.value;
    }
    getHash() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map