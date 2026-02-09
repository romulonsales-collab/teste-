
export enum LicenseType {
  LP = 'LP - Licença Prévia',
  LI = 'LI - Licença de Instalação',
  LO = 'LO - Licença de Operação',
  ASV = 'ASV - Autorização de Supressão',
  OUTORGA = 'Outorga de Água',
  OUTROS = 'Outros'
}

export enum LicenseStatus {
  VIGENTE = 'VIGENTE',
  A_VENCER = 'A_VENCER',
  VENCIDA = 'VENCIDA'
}

export enum UserProfile {
  ADMIN = 'ADMIN',
  GESTOR = 'GESTOR',
  TECNICO = 'TECNICO',
  VISUALIZADOR = 'VISUALIZADOR'
}

export enum AlertChannel {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP'
}

export interface License {
  id: string;
  filial: string;
  rota: string;
  cnpj: string;
  tipo_licenca: LicenseType | string; // Alterado para aceitar strings personalizadas da lista
  orgao_emissor: string;
  data_vencimento: string;
  observacao: string;
  pdf_url?: string;
  created_at: string;
  status?: LicenseStatus;
  alert_horizons?: number[];
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  perfil: UserProfile;
}

export interface AlertHistory {
  id: string;
  licenca_id: string;
  tipo: AlertChannel;
  dias_antes: number;
  enviado_em: string;
  destinatario: string;
  status: 'enviado' | 'lido';
}

export interface AlertConfig {
  active: boolean;
  days: number[];
  channels: AlertChannel[];
}
