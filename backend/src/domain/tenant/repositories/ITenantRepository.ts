import { Tenant } from '../entities/Tenant';
import { TenantMember } from '../entities/TenantMember';

export interface ITenantRepository {
  findById(id: string): Promise<Tenant | null>;
  findByUserId(userId: string): Promise<Tenant[]>;
  findByName(nombre: string): Promise<Tenant | null>;
  save(tenant: Tenant): Promise<void>;
  update(tenant: Tenant): Promise<void>;
  delete(id: string): Promise<void>;
  existsByName(nombre: string, excludeId?: string): Promise<boolean>;
  
  // Members
  findMembersByTenantId(tenantId: string): Promise<TenantMember[]>;
  findMemberByUserIdAndTenantId(userId: string, tenantId: string): Promise<TenantMember | null>;
  saveMember(member: TenantMember): Promise<void>;
  updateMember(member: TenantMember): Promise<void>;
  removeMember(userId: string, tenantId: string): Promise<void>;
}
