export interface IPasswordService {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
    generateResetToken(): string;
}
//# sourceMappingURL=IPasswordService.d.ts.map