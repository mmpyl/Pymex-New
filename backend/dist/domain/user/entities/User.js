"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserId_1 = require("../value-objects/UserId");
const Email_1 = require("../value-objects/Email");
const Password_1 = require("../value-objects/Password");
const UserRole_1 = require("../value-objects/UserRole");
class User {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        const id = UserId_1.UserId.create();
        const fechaRegistro = new Date();
        return new User({
            ...props,
            id,
            fechaRegistro,
        });
    }
    static restore(props) {
        return new User(props);
    }
    getId() {
        return this.props.id;
    }
    getNombre() {
        return this.props.nombre;
    }
    getEmail() {
        return this.props.email;
    }
    getPassword() {
        return this.props.password;
    }
    getRol() {
        return this.props.rol;
    }
    getEmpresaId() {
        return this.props.empresaId;
    }
    getEstado() {
        return this.props.estado;
    }
    getFechaRegistro() {
        return this.props.fechaRegistro;
    }
    updateNombre(nombre) {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('Nombre is required');
        }
        this.props = { ...this.props, nombre: nombre.trim() };
    }
    updateEmail(email) {
        this.props = { ...this.props, email: Email_1.Email.create(email) };
    }
    updatePassword(password) {
        this.props = { ...this.props, password: Password_1.Password.create(password) };
    }
    updateRol(rol) {
        this.props = { ...this.props, rol: UserRole_1.UserRole.create(rol) };
    }
    activate() {
        this.props = { ...this.props, estado: 'activo' };
    }
    deactivate() {
        this.props = { ...this.props, estado: 'inactivo' };
    }
    suspend() {
        this.props = { ...this.props, estado: 'suspendido' };
    }
    isActive() {
        return this.props.estado === 'activo';
    }
    isSuspended() {
        return this.props.estado === 'suspendido';
    }
    isAdmin() {
        return this.props.rol.isAdmin();
    }
    isSuperAdmin() {
        return this.props.rol.isSuperAdmin();
    }
    toObject() {
        return { ...this.props };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map