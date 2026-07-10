export declare class TenantId {
    private readonly value;
    private constructor();
    static create(): TenantId;
    static fromString(value: string): TenantId;
    getValue(): string;
    equals(other: TenantId): boolean;
}
//# sourceMappingURL=TenantId.d.ts.map