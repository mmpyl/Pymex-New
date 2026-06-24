export class IPasswordService {
  hash(password: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  compare(password: string, hash: string): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  generateResetToken(): string {
    throw new Error('Method not implemented');
  }
}