import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/auth/use-cases/LoginUseCase';
import { RegisterUserUseCase } from '../../../application/auth/use-cases/RegisterUserUseCase';
import { RefreshTokenUseCase } from '../../../application/auth/use-cases/RefreshTokenUseCase';
import { LogoutUseCase } from '../../../application/auth/use-cases/LogoutUseCase';
export declare class AuthController {
    private loginUseCase;
    private registerUseCase;
    private refreshTokenUseCase;
    private logoutUseCase;
    constructor(loginUseCase: LoginUseCase, registerUseCase: RegisterUserUseCase, refreshTokenUseCase: RefreshTokenUseCase, logoutUseCase: LogoutUseCase);
    login: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
    logout: (_req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map