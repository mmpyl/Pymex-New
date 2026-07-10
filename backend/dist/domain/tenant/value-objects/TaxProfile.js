"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxProfile = void 0;
class TaxProfile {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        if (!props.ruc || props.ruc.trim().length === 0) {
            throw new Error('RUC is required');
        }
        if (!props.razonSocial || props.razonSocial.trim().length === 0) {
            throw new Error('Razón social is required');
        }
        if (!props.direccionFiscal || props.direccionFiscal.trim().length === 0) {
            throw new Error('Dirección fiscal is required');
        }
        return new TaxProfile({
            ...props,
            ruc: props.ruc.trim(),
            razonSocial: props.razonSocial.trim(),
            direccionFiscal: props.direccionFiscal.trim(),
        });
    }
    getRuc() {
        return this.props.ruc;
    }
    getRazonSocial() {
        return this.props.razonSocial;
    }
    getDireccionFiscal() {
        return this.props.direccionFiscal;
    }
    getTelefono() {
        return this.props.telefono;
    }
    getEmail() {
        return this.props.email;
    }
    equals(other) {
        return this.props.ruc === other.getRuc();
    }
}
exports.TaxProfile = TaxProfile;
//# sourceMappingURL=TaxProfile.js.map