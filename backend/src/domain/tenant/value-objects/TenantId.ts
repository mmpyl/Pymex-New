export class TenantId {
  private constructor(private readonly value: string) {}

  static create(): TenantId {
    const id = crypto.randomUUID();
    return new TenantId(id);
  }

  static fromString(value: string): TenantId {
    if (!value || value.trim().length === 0) {
      throw new Error('TenantId cannot be empty');
    }
    return new TenantId(value.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TenantId): boolean {
    return this.value === other.getValue();
  }
}