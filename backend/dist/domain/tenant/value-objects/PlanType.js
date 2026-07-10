"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanType = void 0;
class PlanType {
    constructor(value) {
        this.value = value;
    }
    static create(plan) {
        if (!plan || !PlanType.VALID_PLANS.includes(plan)) {
            throw new Error(`Invalid plan type. Valid values are: ${PlanType.VALID_PLANS.join(', ')}`);
        }
        return new PlanType(plan);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.getValue();
    }
    isFree() {
        return this.value === 'free';
    }
    isPaid() {
        return this.value !== 'free';
    }
}
exports.PlanType = PlanType;
PlanType.VALID_PLANS = ['free', 'basic', 'pro', 'enterprise'];
//# sourceMappingURL=PlanType.js.map