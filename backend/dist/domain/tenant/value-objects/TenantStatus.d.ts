export type TenantStatusValue = 'activo' | 'suspendido' | 'inactivo';
export declare class TenantStatus {
    private readonly value;
    private static readonly VALID_STATUSES;
    private constructor();
    static create(status: TenantStatusValue): TenantStatus;
    static active(): TenantStatus;
    static suspended(): TenantStatus;
    static inactive(): TenantStatus;
    getValue(): TenantStatusValue;
    equals(other: TenantStatus): boolean;
    isActive(): boolean;
    isSuspended(): boolean;
    isInactive(): boolean;
}
//# sourceMappingURL=TenantStatus.d.ts.map