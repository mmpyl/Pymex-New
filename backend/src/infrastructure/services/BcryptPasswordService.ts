import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { IPasswordService } from '../../domain/user/services/IPasswordService';

export class BcryptPasswordService implements IPasswordService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
