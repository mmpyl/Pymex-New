export class TenantNotFoundError extends Error {
  constructor(tenantId?: string) {
    super(tenantId ? `Tenant with ID ${tenantId} not found` : 'Tenant not found');
    this.name = 'TenantNotFoundError';
  }
}
