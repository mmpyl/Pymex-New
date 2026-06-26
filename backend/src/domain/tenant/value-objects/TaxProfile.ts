export interface TaxProfileProps {
  ruc: string;
  razonSocial: string;
  direccionFiscal: string;
  telefono?: string;
  email?: string;
}

export class TaxProfile {
  private constructor(private readonly props: TaxProfileProps) {}

  static create(props: TaxProfileProps): TaxProfile {
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

  getRuc(): string {
    return this.props.ruc;
  }

  getRazonSocial(): string {
    return this.props.razonSocial;
  }

  getDireccionFiscal(): string {
    return this.props.direccionFiscal;
  }

  getTelefono(): string | undefined {
    return this.props.telefono;
  }

  getEmail(): string | undefined {
    return this.props.email;
  }

  equals(other: TaxProfile): boolean {
    return this.props.ruc === other.getRuc();
  }
}