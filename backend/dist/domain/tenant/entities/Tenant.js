"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const TenantId_1 = require("../value-objects/TenantId");
const TenantStatus_1 = require("../value-objects/TenantStatus");
class Tenant {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        const id = TenantId_1.TenantId.create();
        const fechaCreacion = new Date();
        return new Tenant({
            ...props,
            id,
            fechaCreacion,
        });
    }
    static restore(props) {
        return new Tenant(props);
    }
    getId() {
        return this.props.id;
    }
    getNombre() {
        return this.props.nombre;
    }
    getEstado() {
        return this.props.estado;
    }
    getPlan() {
        return this.props.plan;
    }
    getPerfilFiscal() {
        return this.props.perfilFiscal;
    }
    getFechaCreacion() {
        return this.props.fechaCreacion;
    }
    getFechaVencimiento() {
        return this.props.fechaVencimiento;
    }
    isActive() {
        return this.props.estado.isActive();
    }
    isSuspended() {
        return this.props.estado.isSuspended();
    }
    updateNombre(nombre) {
        this.props.nombre = nombre;
    }
    updatePerfilFiscal(perfil) {
        this.props.perfilFiscal = perfil;
    }
    suspend() {
        this.props.estado = TenantStatus_1.TenantStatus.suspended();
    }
    activate() {
        this.props.estado = TenantStatus_1.TenantStatus.active();
    }
    updatePlan(plan) {
        this.props.plan = plan;
    }
    updateFechaVencimiento(fecha) {
        this.props.fechaVencimiento = fecha;
    }
}
exports.Tenant = Tenant;
//# sourceMappingURL=Tenant.js.map