export declare class Password {
    private readonly value;
    private constructor();
    static create(password: string): Password;
    static fromHash(hash: string): Password;
    getValue(): string;
    getHash(): string;
    equals(other: Password): boolean;
}
//# sourceMappingURL=Password.d.ts.map