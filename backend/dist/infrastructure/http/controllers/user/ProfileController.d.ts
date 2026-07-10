import { Request, Response } from 'express';
export declare class ProfileController {
    private getUserByIdUseCase;
    private updateProfileUseCase;
    constructor();
    getProfile: (req: Request, res: Response) => Promise<void>;
    updateProfile: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=ProfileController.d.ts.map