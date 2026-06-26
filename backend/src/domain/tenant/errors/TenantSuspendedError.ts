export class TenantSuspendedError extends Error {
  constructor(tenantId?: string) {
    super(tenantId ? `Tenant with ID ${tenantId} is suspended` : 'Tenant is suspended');
    this.name = 'TenantSuspendedError';
  }
}
