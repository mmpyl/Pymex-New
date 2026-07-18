export interface JwtPayload {
    userId: string;
    email: string;
    rol: string;
    empresaId?: number;
}
export declare class JwtService {
    static generateAccessToken(payload: JwtPayload): string;
    static generateRefreshToken(payload: JwtPayload): string;
    static verifyAccessToken(token: string): JwtPayload;
    static verifyRefreshToken(token: string): JwtPayload;
    static decodeToken(token: string): JwtPayload | null;
}
//# sourceMappingURL=JwtService.d.ts.map