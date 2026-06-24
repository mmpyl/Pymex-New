export class LogoutUseCase {
  constructor() {}

  async execute(): Promise<void> {
    // En una implementación con JWT stateless, el logout se maneja en el cliente
    // eliminando los tokens. Si se usa blacklist de tokens, aquí se agregaría
    // el token a la blacklist en Redis.
    return Promise.resolve();
  }
}