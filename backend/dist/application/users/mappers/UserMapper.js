"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toResponseDto(user) {
        return {
            id: user.getId().getValue(),
            nombre: user.getNombre(),
            email: user.getEmail().getValue(),
            rol: user.getRol().getValue(),
            empresaId: user.getEmpresaId(),
            estado: user.getEstado(),
            fechaRegistro: user.getFechaRegistro(),
        };
    }
    static toResponseDtoList(users) {
        return users.map(user => this.toResponseDto(user));
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map