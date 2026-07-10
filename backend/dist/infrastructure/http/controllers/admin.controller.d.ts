import { Request, Response } from 'express';
export declare class AdminController {
    private getAllUsersUseCase;
    private getUserByIdUseCase;
    private deleteUserUseCase;
    private changeUserRoleUseCase;
    private suspendUserUseCase;
    constructor();
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    changeRole(req: Request, res: Response): Promise<void>;
    suspendUser(req: Request, res: Response): Promise<void>;
    getDashboardStats(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=admin.controller.d.ts.map