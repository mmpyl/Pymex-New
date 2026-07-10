import { IPasswordService } from '../../domain/user/services/IPasswordService';
export declare class BcryptPasswordService implements IPasswordService {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
    generateResetToken(): string;
}
//# sourceMappingURL=BcryptPasswordService.d.ts.map