export type PlanTypeValue = 'free' | 'basic' | 'pro' | 'enterprise';
export declare class PlanType {
    private readonly value;
    private static readonly VALID_PLANS;
    private constructor();
    static create(plan: PlanTypeValue): PlanType;
    getValue(): PlanTypeValue;
    equals(other: PlanType): boolean;
    isFree(): boolean;
    isPaid(): boolean;
}
//# sourceMappingURL=PlanType.d.ts.map