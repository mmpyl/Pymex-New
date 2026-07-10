"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
class Subscription {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        const id = crypto.randomUUID();
        return new Subscription({
            ...props,
            id,
        });
    }
    static restore(props) {
        return new Subscription(props);
    }
    getId() {
        return this.props.id;
    }
    getTenantId() {
        return this.props.tenantId;
    }
    getPlan() {
        return this.props.plan;
    }
    getFechaInicio() {
        return this.props.fechaInicio;
    }
    getFechaFin() {
        return this.props.fechaFin;
    }
    getEstado() {
        return this.props.estado;
    }
    getPrecioMensual() {
        return this.props.precioMensual;
    }
    getMoneda() {
        return this.props.moneda;
    }
    isActive() {
        return this.props.estado === 'active';
    }
    isCancelled() {
        return this.props.estado === 'cancelled';
    }
    isExpired() {
        return this.props.estado === 'expired' || new Date() > this.props.fechaFin;
    }
    cancel() {
        if (this.props.estado === 'cancelled') {
            throw new Error('Subscription already cancelled');
        }
        this.props.estado = 'cancelled';
    }
    renew(fechaFin) {
        if (this.props.estado === 'cancelled') {
            throw new Error('Cannot renew a cancelled subscription');
        }
        this.props.fechaFin = fechaFin;
        this.props.estado = 'active';
    }
    updatePlan(plan) {
        this.props.plan = plan;
    }
    updatePrecio(precio) {
        if (precio < 0) {
            throw new Error('Price cannot be negative');
        }
        this.props.precioMensual = precio;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map