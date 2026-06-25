import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { UserNotFoundError } from '../../../domain/user/errors/UserNotFoundError';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new UserNotFoundError();
    }

    await this.userRepository.delete(id);
  }
}
