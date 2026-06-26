import { Tenant } from '../entities/Tenant';
import { TenantMember, MemberRole } from '../entities/TenantMember';

export interface ITenantDomainService {
  createTenant(nombre: string, ownerId: string): Promise<Tenant>;
  addMemberToTenant(tenantId: string, userId: string, rol: MemberRole): Promise<TenantMember>;
  removeMemberFromTenant(tenantId: string, userId: string): Promise<void>;
  suspendTenant(tenantId: string): Promise<void>;
  activateTenant(tenantId: string): Promise<void>;
  validateTenantAccess(userId: string, tenantId: string): Promise<boolean>;
}
