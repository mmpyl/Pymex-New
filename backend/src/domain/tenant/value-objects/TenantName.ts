export class TenantName {
  private constructor(private readonly value: string) {}

  static create(name: string): TenantName {
    if (!name || name.trim().length === 0) {
      throw new Error('Tenant name cannot be empty');
    }
    
    const trimmed = name.trim();
    
    if (trimmed.length < 3) {
      throw new Error('Tenant name must be at least 3 characters long');
    }
    
    if (trimmed.length > 100) {
      throw new Error('Tenant name must not exceed 100 characters');
    }

    return new TenantName(trimmed);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TenantName): boolean {
    return this.value === other.getValue();
  }
}