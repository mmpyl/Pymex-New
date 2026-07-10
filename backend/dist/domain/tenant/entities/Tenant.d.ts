import { TenantId } from '../value-objects/TenantId';
import { TenantName } from '../value-objects/TenantName';
import { TenantStatus } from '../value-objects/TenantStatus';
import { TaxProfile } from '../value-objects/TaxProfile';
import { PlanType } from '../value-objects/PlanType';
export interface TenantProps {
    id: TenantId;
    nombre: TenantName;
    estado: TenantStatus;
    plan: PlanType;
    perfilFiscal?: TaxProfile;
    fechaCreacion: Date;
    fechaVencimiento?: Date;
}
export declare class Tenant {
    private props;
    private constructor();
    static create(props: Omit<TenantProps, 'id' | 'fechaCreacion'>): Tenant;
    static restore(props: TenantProps): Tenant;
    getId(): TenantId;
    getNombre(): TenantName;
    getEstado(): TenantStatus;
    getPlan(): PlanType;
    getPerfilFiscal(): TaxProfile | undefined;
    getFechaCreacion(): Date;
    getFechaVencimiento(): Date | undefined;
    isActive(): boolean;
    isSuspended(): boolean;
    updateNombre(nombre: TenantName): void;
    updatePerfilFiscal(perfil: TaxProfile): void;
    suspend(): void;
    activate(): void;
    updatePlan(plan: PlanType): void;
    updateFechaVencimiento(fecha: Date): void;
}
//# sourceMappingURL=Tenant.d.ts.map