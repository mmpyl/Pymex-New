export class TenantAlreadyExistsError extends Error {
  constructor(identifier?: string) {
    super(identifier ? `Tenant with identifier ${identifier} already exists` : 'Tenant already exists');
    this.name = 'TenantAlreadyExistsError';
  }
}
