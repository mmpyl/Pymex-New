import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
export declare class DeleteUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeleteUserUseCase.d.ts.map