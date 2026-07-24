"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../database/models/user.model");
const User_1 = require("../../domain/user/entities/User");
const UserId_1 = require("../../domain/user/value-objects/UserId");
const Email_1 = require("../../domain/user/value-objects/Email");
const Password_1 = require("../../domain/user/value-objects/Password");
const UserRole_1 = require("../../domain/user/value-objects/UserRole");
const UserNotFoundError_1 = require("../../domain/user/errors/UserNotFoundError");
const sequelize_1 = require("sequelize");
class UserRepository {
    toDomain(model) {
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
    async findById(id) {
        const model = await user_model_1.UserModel.findByPk(id);
        if (!model)
            return null;
        return this.toDomain(model);
    }
    async findByEmail(email) {
        const model = await user_model_1.UserModel.findOne({ where: { email } });
        if (!model)
            return null;
        return this.toDomain(model);
    }
    async findByEmpresaId(empresaId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await user_model_1.UserModel.findAndCountAll({
            where: { empresaId },
            offset,
            limit,
        });
        const users = rows.map(model => this.toDomain(model));
        return { users, total: count };
    }
    async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await user_model_1.UserModel.findAndCountAll({
            offset,
            limit,
            order: [['fechaRegistro', 'DESC']],
        });
        return { users: rows.map(model => this.toDomain(model)), total: count };
    }
    async save(user) {
        await user_model_1.UserModel.findOrCreate({
            where: { email: user.getEmail().getValue() },
            defaults: {
                id: user.getId().getValue(),
                nombre: user.getNombre(),
                email: user.getEmail().getValue(),
                password: user.getPassword().getHash(),
                rol: user.getRol().getValue(),
                empresaId: user.getEmpresaId(),
                estado: user.getEstado(),
                fechaRegistro: user.getFechaRegistro(),
            },
        });
    }
    async update(user) {
        const model = await user_model_1.UserModel.findByPk(user.getId().getValue());
        if (!model) {
            throw new UserNotFoundError_1.UserNotFoundError(user.getId().getValue());
        }
        await model.update({
            nombre: user.getNombre(),
            email: user.getEmail().getValue(),
            password: user.getPassword().getHash(),
            rol: user.getRol().getValue(),
            empresaId: user.getEmpresaId(),
            estado: user.getEstado(),
        });
    }
    async delete(id) {
        const model = await user_model_1.UserModel.findByPk(id);
        if (!model) {
            throw new UserNotFoundError_1.UserNotFoundError(id);
        }
        await model.destroy();
    }
    async existsByEmail(email, excludeId) {
        const where = { email };
        if (excludeId) {
            where.id = { [sequelize_1.Op.ne]: excludeId };
        }
        const model = await user_model_1.UserModel.findOne({ where });
        return !!model;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map