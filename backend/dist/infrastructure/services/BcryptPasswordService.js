"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
class BcryptPasswordService {
    constructor() {
        this.saltRounds = 10;
    }
    async hash(password) {
        return bcryptjs_1.default.hash(password, this.saltRounds);
    }
    async compare(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
    generateResetToken() {
        return crypto_1.default.randomBytes(32).toString('hex');
    }
}
exports.BcryptPasswordService = BcryptPasswordService;
//# sourceMappingURL=BcryptPasswordService.js.map