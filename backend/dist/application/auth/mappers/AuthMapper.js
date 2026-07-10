"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMapper = void 0;
const User_1 = require("../../../domain/user/entities/User");
const Email_1 = require("../../../domain/user/value-objects/Email");
const Password_1 = require("../../../domain/user/value-objects/Password");
const UserId_1 = require("../../../domain/user/value-objects/UserId");
const UserRole_1 = require("../../../domain/user/value-objects/UserRole");
function parseEstado(estado) {
    if (estado === 'activo' || estado === 'inactivo' || estado === 'suspendido')
        return estado;
    throw new Error(`Invalid estado: ${String(estado)}`);
}
class AuthMapper {
    static toAuthResponse(user, accessToken, refreshToken, expiresIn) {
        return {
            user: {
                id: user.getId().getValue(),
                nombre: user.getNombre(),
                email: user.getEmail().getValue(),
                rol: user.getRol().getValue(),
                empresaId: user.getEmpresaId(),
            },
            accessToken,
            refreshToken,
            expiresIn: 3600,
        };
    }
    static toDomainUser(model) {
        return User_1.User.restore({
            id: UserId_1.UserId.create(String(model.id)),
            nombre: model.nombre,
            email: Email_1.Email.create(String(model.email)),
            password: Password_1.Password.fromHash(String(model.password)),
            rol: UserRole_1.UserRole.create(model.rol),
            empresaId: model.empresaId,
            estado: model.estado,
            fechaRegistro: model.fechaRegistro,
        });
    }
}
exports.AuthMapper = AuthMapper;
//# sourceMappingURL=AuthMapper.js.map