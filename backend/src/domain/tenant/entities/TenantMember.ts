import { UserId } from '../../user/value-objects/UserId';
import { TenantId } from '../value-objects/TenantId';

export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface TenantMemberProps {
  tenantId: TenantId;
  userId: UserId;
  rol: MemberRole;
  fechaInvitacion: Date;
  fechaAceptacion?: Date;
  aceptado: boolean;
}

export class TenantMember {
  private constructor(private props: TenantMemberProps) {}

  static create(props: Omit<TenantMemberProps, 'fechaInvitacion' | 'aceptado'>): TenantMember {
    return new TenantMember({
      ...props,
      fechaInvitacion: new Date(),
      aceptado: false,
    });
  }

  static restore(props: TenantMemberProps): TenantMember {
    return new TenantMember(props);
  }

  getTenantId(): TenantId {
    return this.props.tenantId;
  }

  getUserId(): UserId {
    return this.props.userId;
  }

  getRol(): MemberRole {
    return this.props.rol;
  }

  getFechaInvitacion(): Date {
    return this.props.fechaInvitacion;
  }

  getFechaAceptacion(): Date | undefined {
    return this.props.fechaAceptacion;
  }

  isAccepted(): boolean {
    return this.props.aceptado;
  }

  accept(): void {
    if (this.props.aceptado) {
      throw new Error('Invitation already accepted');
    }
    this.props.aceptado = true;
    this.props.fechaAceptacion = new Date();
  }

  updateRol(rol: MemberRole): void {
    this.props.rol = rol;
  }

  isOwner(): boolean {
    return this.props.rol === 'owner';
  }

  isAdmin(): boolean {
    return this.props.rol === 'admin';
  }

  hasPermission(requiredRole: MemberRole): boolean {
    const hierarchy: Record<MemberRole, number> = {
      viewer: 1,
      member: 2,
      admin: 3,
      owner: 4,
    };
    return hierarchy[this.props.rol] >= hierarchy[requiredRole];
  }
}
