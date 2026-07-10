import { TenantId } from '../value-objects/TenantId';
import { PlanType } from '../value-objects/PlanType';
export interface SubscriptionProps {
    id: string;
    tenantId: TenantId;
    plan: PlanType;
    fechaInicio: Date;
    fechaFin: Date;
    estado: 'active' | 'cancelled' | 'expired' | 'pending';
    precioMensual: number;
    moneda: string;
}
export declare class Subscription {
    private props;
    private constructor();
    static create(props: Omit<SubscriptionProps, 'id'>): Subscription;
    static restore(props: SubscriptionProps): Subscription;
    getId(): string;
    getTenantId(): TenantId;
    getPlan(): PlanType;
    getFechaInicio(): Date;
    getFechaFin(): Date;
    getEstado(): 'active' | 'cancelled' | 'expired' | 'pending';
    getPrecioMensual(): number;
    getMoneda(): string;
    isActive(): boolean;
    isCancelled(): boolean;
    isExpired(): boolean;
    cancel(): void;
    renew(fechaFin: Date): void;
    updatePlan(plan: PlanType): void;
    updatePrecio(precio: number): void;
}
//# sourceMappingURL=Subscription.d.ts.map