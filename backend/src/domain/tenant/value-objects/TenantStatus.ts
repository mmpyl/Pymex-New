export type TenantStatusValue = 'activo' | 'suspendido' | 'inactivo';

export class TenantStatus {
  private static readonly VALID_STATUSES: TenantStatusValue[] = ['activo', 'suspendido', 'inactivo'];
  
  private constructor(private readonly value: TenantStatusValue) {}

  static create(status: TenantStatusValue): TenantStatus {
    if (!status || !TenantStatus.VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid tenant status. Valid values are: ${TenantStatus.VALID_STATUSES.join(', ')}`);
    }
    return new TenantStatus(status);
  }

  static active(): TenantStatus {
    return new TenantStatus('activo');
  }

  static suspended(): TenantStatus {
    return new TenantStatus('suspendido');
  }

  static inactive(): TenantStatus {
    return new TenantStatus('inactivo');
  }

  getValue(): TenantStatusValue {
    return this.value;
  }

  equals(other: TenantStatus): boolean {
    return this.value === other.getValue();
  }

  isActive(): boolean {
    return this.value === 'activo';
  }

  isSuspended(): boolean {
    return this.value === 'suspendido';
  }

  isInactive(): boolean {
    return this.value === 'inactivo';
  }
}