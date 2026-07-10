import { Request, Response } from 'express';
export declare class UserController {
    private getAllUsersUseCase;
    private getUserByIdUseCase;
    private updateProfileUseCase;
    private deleteUserUseCase;
    private changeRoleUseCase;
    private suspendUserUseCase;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    changeRole: (req: Request, res: Response) => Promise<void>;
    suspend: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map