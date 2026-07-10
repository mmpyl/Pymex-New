export interface AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
        id: string;
        nombre: string;
        email: string;
        rol: string;
        empresaId?: number;
    };
}
//# sourceMappingURL=AuthResponseDto.d.ts.map