import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '../../config/env';

export interface JwtPayload {
  userId: string;
  email: string;
  rol: string;
  empresaId?: number;
}

export class JwtService {
  static generateAccessToken(payload: JwtPayload): string {
    const options: jwt.SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as string | number,
    };
    return jwt.sign(payload, env.JWT_SECRET, options);
  }

  static generateRefreshToken(payload: JwtPayload): string {
    const options: jwt.SignOptions = {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as string | number,
    };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
  }


  static verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  static verifyRefreshToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
