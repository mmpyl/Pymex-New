import { Request, Response, NextFunction } from 'express';
import { JwtService, JwtPayload } from '../../services/JwtService';


export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Access token is missing or invalid' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const payload = JwtService.verifyAccessToken(token);
    
    req.user = payload;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message || 'Unauthorized' });
  }
};

export const optionalAuthMiddleware = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = JwtService.verifyAccessToken(token);
      req.user = payload;
    }
    
    next();
  } catch (error) {
    // Continue without user context
    next();
  }
};
