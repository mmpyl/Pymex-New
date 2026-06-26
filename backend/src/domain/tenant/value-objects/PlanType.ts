export type PlanTypeValue = 'free' | 'basic' | 'pro' | 'enterprise';

export class PlanType {
  private static readonly VALID_PLANS: PlanTypeValue[] = ['free', 'basic', 'pro', 'enterprise'];
  
  private constructor(private readonly value: PlanTypeValue) {}

  static create(plan: PlanTypeValue): PlanType {
    if (!plan || !PlanType.VALID_PLANS.includes(plan)) {
      throw new Error(`Invalid plan type. Valid values are: ${PlanType.VALID_PLANS.join(', ')}`);
    }
    return new PlanType(plan);
  }

  getValue(): PlanTypeValue {
    return this.value;
  }

  equals(other: PlanType): boolean {
    return this.value === other.getValue();
  }

  isFree(): boolean {
    return this.value === 'free';
  }

  isPaid(): boolean {
    return this.value !== 'free';
  }
}