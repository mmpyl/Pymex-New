import { TenantId } from './value-objects/TenantId';
import { TenantName } from './value-objects/TenantName';
import { TenantStatus } from './value-objects/TenantStatus';
import { TaxProfile } from './value-objects/TaxProfile';
import { PlanType } from './value-objects/PlanType';

export interface TenantProps {
  id: TenantId;
  nombre: TenantName;
  estado: TenantStatus;
  plan: PlanType;
  perfilFiscal?: TaxProfile;
  fechaCreacion: Date;
  fechaVencimiento?: Date;
}

export class Tenant {
  private constructor(private props: TenantProps) {}

  static create(props: Omit<TenantProps, 'id' | 'fechaCreacion'>): Tenant {
    const id = TenantId.create();
    const fechaCreacion = new Date();

    return new Tenant({
      ...props,
      id,
      fechaCreacion,
    });
  }

  static restore(props: TenantProps): Tenant {
    return new Tenant(props);
  }

  getId(): TenantId {
    return this.props.id;
  }

  getNombre(): TenantName {
    return this.props.nombre;
  }

  getEstado(): TenantStatus {
    return this.props.estado;
  }

  getPlan(): PlanType {
    return this.props.plan;
  }

  getPerfilFiscal(): TaxProfile | undefined {
    return this.props.perfilFiscal;
  }

  getFechaCreacion(): Date {
    return this.props.fechaCreacion;
  }

  getFechaVencimiento(): Date | undefined {
    return this.props.fechaVencimiento;
  }

  isActive(): boolean {
    return this.props.estado.isActive();
  }

  isSuspended(): boolean {
    return this.props.estado.isSuspended();
  }

  updateNombre(nombre: TenantName): void {
    this.props.nombre = nombre;
  }

  updatePerfilFiscal(perfil: TaxProfile): void {
    this.props.perfilFiscal = perfil;
  }

  suspend(): void {
    this.props.estado = TenantStatus.suspended();
  }

  activate(): void {
    this.props.estado = TenantStatus.active();
  }

  updatePlan(plan: PlanType): void {
    this.props.plan = plan;
  }

  updateFechaVencimiento(fecha: Date): void {
    this.props.fechaVencimiento = fecha;
  }
}