import { RecoverPasswordDto } from '../dtos/RecoverPasswordDto';

export class RecoverPasswordUseCase {
  constructor() {}

  async execute(_dto: RecoverPasswordDto): Promise<void> {
    // TODO: Implementar lógica de recuperación de contraseña
    // 1. Buscar usuario por email
    // 2. Generar token de reset
    // 3. Guardar token en DB con expiry
    // 4. Enviar email con link de reset
    return Promise.resolve();
  }
}