import { UserId } from './value-objects/UserId';
import { Email } from './value-objects/Email';
import { Password } from './value-objects/Password';
import { UserRole, UserRoleType } from './value-objects/UserRole';

export interface UserProps {
  id: UserId;
  nombre: string;
  email: Email;
  password: Password;
  rol: UserRole;
  empresaId?: number;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaRegistro: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: Omit<UserProps, 'id' | 'fechaRegistro'>): User {
    const id = UserId.create();
    const fechaRegistro = new Date();
    
    return new User({
      ...props,
      id,
      fechaRegistro,
    });
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  getId(): UserId {
    return this.props.id;
  }

  getNombre(): string {
    return this.props.nombre;
  }

  getEmail(): Email {
    return this.props.email;
  }

  getPassword(): Password {
    return this.props.password;
  }

  getRol(): UserRole {
    return this.props.rol;
  }

  getEmpresaId(): number | undefined {
    return this.props.empresaId;
  }

  getEstado(): string {
    return this.props.estado;
  }

  getFechaRegistro(): Date {
    return this.props.fechaRegistro;
  }

  updateNombre(nombre: string): void {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('Nombre is required');
    }
    this.props.nombre = nombre.trim();
  }

  updateEmail(email: string): void {
    this.props.email = Email.create(email);
  }

  updatePassword(password: string): void {
    this.props.password = Password.create(password);
  }

  updateRol(rol: UserRoleType): void {
    this.props.rol = UserRole.create(rol);
  }

  activate(): void {
    this.props.estado = 'activo';
  }

  deactivate(): void {
    this.props.estado = 'inactivo';
  }

  suspend(): void {
    this.props.estado = 'suspendido';
  }

  isActive(): boolean {
    return this.props.estado === 'activo';
  }

  isSuspended(): boolean {
    return this.props.estado === 'suspendido';
  }

  isAdmin(): boolean {
    return this.props.rol.isAdmin();
  }

  isSuperAdmin(): boolean {
    return this.props.rol.isSuperAdmin();
  }

  toObject(): UserProps {
    return { ...this.props };
  }
}