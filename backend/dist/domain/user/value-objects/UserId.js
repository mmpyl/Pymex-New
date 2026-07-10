"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
class UserId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
            throw new Error('Invalid UUID format');
        }
        return new UserId(id || crypto.randomUUID());
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
}
exports.UserId = UserId;
//# sourceMappingURL=UserId.js.map