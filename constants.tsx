
import { License, LicenseType, LicenseStatus, AlertHistory, AlertChannel, User, UserProfile } from './types';

export const MOCK_USER: User = {
  id: '1',
  nome: 'Lucas Meireles',
  email: 'lucas@ecoguard.com.br',
  telefone: '(11) 98888-7777',
  perfil: UserProfile.ADMIN
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  {
    id: '2',
    nome: 'Ana Silva',
    email: 'ana.visualizador@empresa.com',
    telefone: '(11) 97777-6666',
    perfil: UserProfile.VISUALIZADOR
  },
  {
    id: '3',
    nome: 'Pedro Rocha',
    email: 'pedro.tecnico@empresa.com',
    telefone: '(11) 96666-5555',
    perfil: UserProfile.TECNICO
  }
];

const getRelativeDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const licenseTitles = [
  "AA IBAMA",
  "ALVARÁ DE FUNCIONAMENTO",
  "ALVARÁ DE FUNCIONAMENTO (RENOVAÇÃO)",
  "AMBIENTAL ESTADUAL",
  "AMBIENTAL MINÉRIOS",
  "AMBIENTAL MUNICIPAL",
  "BOMBEIROS",
  "CTF IBAMA",
  "DMR TRIMESTRAL SIGOR",
  "EXÉRCITO",
  "L.O",
  "L.O",
  "Lei 10165 RELATÓRIOS",
  "AMBIENTAL MUNICIPAL (DEPÓSITO)",
  "POLICIA CIVIL",
  "POLICIA CIVIL (ARMAZEM)",
  "POLICIA CIVIL (TRANSPORTE)",
  "PROTOCOLO PROCON",
  "FUMAÇA PRETA - INEA",
  "TAXA TCFA - IBAMA - PORTE GRA",
  "TAXA TCFA - IBAMA - PORTE MED",
  "TAXA TCFA - IBAMA - PORTE MICRO",
  "TAXA TCFA - IBAMA - PORTE PEQ",
  "TAXA TCFA - IBAMA - micro",
  "VIGILÂNCIA SANITÁRIA",
  "MAPAS PF - MENSAL",
  "POLICIA FEDERAL",
  "RELATÓRIO TÉCNICO ANUAL",
  "TAXA MUNICIPAL TRIMESTRAL",
  "MAPAS PC - TRIMESTRAL",
  "PAE (AMBIPAR)",
  "PAE (municipal - SP)",
  "PAE MG",
  "PGR (PAE)",
  "JORNAL DO MEIO AMBIENTE",
  "SP REGULA",
  "LICENÇA AMBIENTAL ÚNICA",
  "CERTIFICADO DIGITAL ROMULO",
  "DISPENSA DE OUTROGA",
  "LICENÇA AMBIENTAL ESTOCAGEM",
  "AMBIENTAL ESTADUAL LO",
  "LICENCIAMENTO ESTADUAL",
  "LICENÇA AMBIENTAL RESÍDUOS NÃO PERIGOSOS",
  "LICENÇA AMBIENTAL RESÍDUOS PERIGOSOS",
  "CADRI SÓLIDOS CONTAMINADOS"
];

const filiais = ["Matriz - SP", "Unidade RJ", "Filial MG", "Terminal Santos", "CD Curitiba", "Fazenda MT"];
const orgaos = ["IBAMA", "CETESB", "INEA", "FEAM", "POLICIA FEDERAL", "AMMA", "IAT", "SEMA-MT"];

export const MOCK_LICENSES: License[] = licenseTitles.map((title, index) => {
  const statusSeed = (index % 5);
  let days = 100;
  if (statusSeed === 0) days = -15; // Vencida
  if (statusSeed === 1) days = 45;  // A Vencer
  if (statusSeed === 2) days = 300; // Vigente
  if (statusSeed === 3) days = 10;  // A Vencer Urgente
  if (statusSeed === 4) days = 600; // Vigente Longa

  return {
    id: `l-auto-${index}`,
    filial: filiais[index % filiais.length],
    rota: `Rota ${String.fromCharCode(65 + (index % 10))}`,
    cnpj: `12.345.678/000${(index % 9) + 1}-90`,
    tipo_licenca: title,
    orgao_emissor: orgaos[index % orgaos.length],
    data_vencimento: getRelativeDate(days),
    observacao: `Monitoramento automático para ${title}. Verificar condicionantes anexas.`,
    created_at: '2023-01-01',
    pdf_url: `${title.replace(/\s+/g, '_').toLowerCase()}.pdf`,
    alert_horizons: [90, 60, 30, 10, 0]
  };
});

export const MOCK_ALERTS: AlertHistory[] = [
  {
    id: 'a1',
    licenca_id: 'l-auto-0',
    tipo: AlertChannel.EMAIL,
    dias_antes: 90,
    enviado_em: '2024-12-10 08:30',
    destinatario: 'gestao@ecoguard.com.br',
    status: 'lido'
  }
];

export const getStatus = (dueDate: string): LicenseStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return LicenseStatus.VENCIDA;
  if (diffDays <= 90) return LicenseStatus.A_VENCER;
  return LicenseStatus.VIGENTE;
};
