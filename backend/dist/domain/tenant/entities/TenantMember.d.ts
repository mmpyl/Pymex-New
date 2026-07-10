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
export declare class TenantMember {
    private props;
    private constructor();
    static create(props: Omit<TenantMemberProps, 'fechaInvitacion' | 'aceptado'>): TenantMember;
    static restore(props: TenantMemberProps): TenantMember;
    getTenantId(): TenantId;
    getUserId(): UserId;
    getRol(): MemberRole;
    getFechaInvitacion(): Date;
    getFechaAceptacion(): Date | undefined;
    isAccepted(): boolean;
    accept(): void;
    updateRol(rol: MemberRole): void;
    isOwner(): boolean;
    isAdmin(): boolean;
    hasPermission(requiredRole: MemberRole): boolean;
}
//# sourceMappingURL=TenantMember.d.ts.map