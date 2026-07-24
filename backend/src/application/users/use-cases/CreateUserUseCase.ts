import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { UserMapper } from '../mappers/UserMapper';
import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { IPasswordService } from '../../../domain/user/services/IPasswordService';
import { User } from '../../../domain/user/entities/User';
import { Email } from '../../../domain/user/value-objects/Email';
import { Password } from '../../../domain/user/value-objects/Password';
import { UserRole } from '../../../domain/user/value-objects/UserRole';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const emailExists = await this.userRepository.existsByEmail(dto.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await this.passwordService.hash(dto.password);
    const user = User.create({
      nombre: dto.nombre.trim(),
      email: Email.create(dto.email),
      password: Password.fromHash(hashedPassword),
      rol: UserRole.create(dto.rol || 'empleado'),
      empresaId: dto.empresaId,
      estado: 'activo',
    });

    await this.userRepository.save(user);
    return UserMapper.toResponseDto(user);
  }
}
