export interface TaxProfileProps {
    ruc: string;
    razonSocial: string;
    direccionFiscal: string;
    telefono?: string;
    email?: string;
}
export declare class TaxProfile {
    private readonly props;
    private constructor();
    static create(props: TaxProfileProps): TaxProfile;
    getRuc(): string;
    getRazonSocial(): string;
    getDireccionFiscal(): string;
    getTelefono(): string | undefined;
    getEmail(): string | undefined;
    equals(other: TaxProfile): boolean;
}
//# sourceMappingURL=TaxProfile.d.ts.map