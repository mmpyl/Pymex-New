import { Request, Response, NextFunction } from 'express';

export type UserRoleType = 'super_admin' | 'admin' | 'soporte' | 'gerente' | 'empleado' | 'contador';

const roleHierarchy: Record<UserRoleType, number> = {
  super_admin: 5,
  admin: 4,
  soporte: 3,
  gerente: 2,
  empleado: 1,
  contador: 1,
};

export function roleMiddleware(requiredRoles: UserRoleType[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const userRole = user.rol as UserRoleType;
    
    if (!requiredRoles.includes(userRole)) {
      // Check hierarchy - higher roles can access lower role routes
      const userLevel = roleHierarchy[userRole] || 0;
      const requiredLevel = Math.max(...requiredRoles.map(r => roleHierarchy[r] || 0));
      
      if (userLevel < requiredLevel) {
        res.status(403).json({ 
          success: false, 
          error: 'Insufficient permissions' 
        });
        return;
      }
    }

    next();
  };
}

// Specific role middleware helpers
export const requireAdmin = roleMiddleware(['super_admin', 'admin']);
export const requireSuperAdmin = roleMiddleware(['super_admin']);
export const requireSoporte = roleMiddleware(['super_admin', 'admin', 'soporte']);
