import { Request, Response, NextFunction } from 'express';
export type UserRoleType = 'super_admin' | 'admin' | 'soporte' | 'gerente' | 'empleado' | 'contador';
export declare function roleMiddleware(requiredRoles: UserRoleType[]): (req: Request, res: Response, next: NextFunction) => void;
export declare const requireAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireSuperAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireSoporte: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map