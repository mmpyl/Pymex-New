# TODO - Reparar errores (User/Auth mappers & repository)

## Plan
- [ ] 1) Validar y convertir `estado` (string -> 'activo'|'inactivo'|'suspendido') sin `as any`
- [ ] 2) Validar y convertir `rol` (string/enum -> UserRoleType) sin `as any`
- [ ] 3) Corregir `save()` para que actualice datos si el usuario existe (upsert o find+update)
- [ ] 4) Corregir `existsByEmail()` para no depender de `where.id` si no coincide con el PK real
- [ ] 5) Ejecutar build/lint/tests del backend para confirmar compilación

## Archivos involucrados
- backend/src/application/auth/mappers/AuthMapper.ts
- backend/src/infrastructure/repositories/user.repository.ts
- (posiblemente) backend/src/domain/user/value-objects/UserRole.ts
- (posiblemente) backend/src/domain/user/entities/User.ts

