export class InvalidTaxIdError extends Error {
  constructor(taxId?: string) {
    super(taxId ? `Invalid tax ID: ${taxId}` : 'Invalid tax ID');
    this.name = 'InvalidTaxIdError';
  }
}
