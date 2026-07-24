"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
const User_1 = require("../../../domain/user/entities/User");
const Email_1 = require("../../../domain/user/value-objects/Email");
const Password_1 = require("../../../domain/user/value-objects/Password");
const UserRole_1 = require("../../../domain/user/value-objects/UserRole");
class CreateUserUseCase {
    constructor(userRepository, passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }
    async execute(dto) {
        const emailExists = await this.userRepository.existsByEmail(dto.email);
        if (emailExists) {
            throw new Error('Email already registered');
        }
        const hashedPassword = await this.passwordService.hash(dto.password);
        const user = User_1.User.create({
            nombre: dto.nombre.trim(),
            email: Email_1.Email.create(dto.email),
            password: Password_1.Password.fromHash(hashedPassword),
            rol: UserRole_1.UserRole.create(dto.rol || 'empleado'),
            empresaId: dto.empresaId,
            estado: 'activo',
        });
        await this.userRepository.save(user);
        return UserMapper_1.UserMapper.toResponseDto(user);
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUserUseCase.js.map