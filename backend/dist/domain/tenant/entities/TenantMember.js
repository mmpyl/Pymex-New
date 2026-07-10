"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantMember = void 0;
class TenantMember {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new TenantMember({
            ...props,
            fechaInvitacion: new Date(),
            aceptado: false,
        });
    }
    static restore(props) {
        return new TenantMember(props);
    }
    getTenantId() {
        return this.props.tenantId;
    }
    getUserId() {
        return this.props.userId;
    }
    getRol() {
        return this.props.rol;
    }
    getFechaInvitacion() {
        return this.props.fechaInvitacion;
    }
    getFechaAceptacion() {
        return this.props.fechaAceptacion;
    }
    isAccepted() {
        return this.props.aceptado;
    }
    accept() {
        if (this.props.aceptado) {
            throw new Error('Invitation already accepted');
        }
        this.props.aceptado = true;
        this.props.fechaAceptacion = new Date();
    }
    updateRol(rol) {
        this.props.rol = rol;
    }
    isOwner() {
        return this.props.rol === 'owner';
    }
    isAdmin() {
        return this.props.rol === 'admin';
    }
    hasPermission(requiredRole) {
        const hierarchy = {
            viewer: 1,
            member: 2,
            admin: 3,
            owner: 4,
        };
        return hierarchy[this.props.rol] >= hierarchy[requiredRole];
    }
}
exports.TenantMember = TenantMember;
//# sourceMappingURL=TenantMember.js.map