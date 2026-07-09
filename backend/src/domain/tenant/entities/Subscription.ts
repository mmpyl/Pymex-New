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

export class Subscription {
  private constructor(private props: SubscriptionProps) {}

  static create(props: Omit<SubscriptionProps, 'id'>): Subscription {
    const id = crypto.randomUUID();
    return new Subscription({
      ...props,
      id,
    });
  }

  static restore(props: SubscriptionProps): Subscription {
    return new Subscription(props);
  }

  getId(): string {
    return this.props.id;
  }

  getTenantId(): TenantId {
    return this.props.tenantId;
  }

  getPlan(): PlanType {
    return this.props.plan;
  }

  getFechaInicio(): Date {
    return this.props.fechaInicio;
  }

  getFechaFin(): Date {
    return this.props.fechaFin;
  }

  getEstado(): 'active' | 'cancelled' | 'expired' | 'pending' {
    return this.props.estado;
  }

  getPrecioMensual(): number {
    return this.props.precioMensual;
  }

  getMoneda(): string {
    return this.props.moneda;
  }

  isActive(): boolean {
    return this.props.estado === 'active';
  }

  isCancelled(): boolean {
    return this.props.estado === 'cancelled';
  }

  isExpired(): boolean {
    return this.props.estado === 'expired' || new Date() > this.props.fechaFin;
  }

  cancel(): void {
    if (this.props.estado === 'cancelled') {
      throw new Error('Subscription already cancelled');
    }
    this.props.estado = 'cancelled';
  }

  renew(fechaFin: Date): void {
    if (this.props.estado === 'cancelled') {
      throw new Error('Cannot renew a cancelled subscription');
    }
    this.props.fechaFin = fechaFin;
    this.props.estado = 'active';
  }

  updatePlan(plan: PlanType): void {
    this.props.plan = plan;
  }

  updatePrecio(precio: number): void {
    if (precio < 0) {
      throw new Error('Price cannot be negative');
    }
    this.props.precioMensual = precio;
  }
}
