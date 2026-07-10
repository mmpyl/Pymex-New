export interface RoleProps {
    id: number;
    nombre: string;
    descripcion?: string;
    permisos: string[];
}
export declare class Role {
    private props;
    private constructor();
    static create(props: Omit<RoleProps, 'id'>): Role;
    static restore(props: RoleProps): Role;
    getId(): number;
    getNombre(): string;
    getDescripcion(): string | undefined;
    getPermisos(): string[];
    hasPermission(permission: string): boolean;
    updateNombre(nombre: string): void;
    updateDescripcion(descripcion: string): void;
    updatePermisos(permisos: string[]): void;
    toObject(): RoleProps;
}
//# sourceMappingURL=Role.d.ts.map