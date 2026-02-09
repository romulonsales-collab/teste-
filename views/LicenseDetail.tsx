
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Edit3, 
  AlertCircle, 
  History, 
  FileText, 
  Mail,
  MessageCircle,
  ShieldCheck,
  Clock,
  Trash2,
  Upload,
  Eye,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { MOCK_LICENSES, MOCK_ALERTS, getStatus } from '../constants';
import { LicenseStatus, AlertChannel, User, UserProfile } from '../types';

const LicenseDetail: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const license = MOCK_LICENSES.find(l => l.id === id);
  const alerts = MOCK_ALERTS.filter(a => a.licenca_id === id);
  
  // Estado para gerenciar se o documento está visível ou foi "excluído" no mock
  const [hasDocument, setHasDocument] = useState(!!license?.pdf_url);
  const [showPreview, setShowPreview] = useState(false);

  const isVisualizador = currentUser.perfil === UserProfile.VISUALIZADOR;

  if (!license) return <div className="p-8 text-center font-bold text-slate-500">Licença não encontrada.</div>;

  const status = getStatus(license.data_vencimento);

  // URLs de exemplo para o visualizador de PDF
  const pdfSampleUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const handleDeleteDoc = () => {
    if (window.confirm('Deseja realmente excluir este documento? Esta ação removerá o arquivo digitalizado do servidor.')) {
      setHasDocument(false);
      setShowPreview(false);
    }
  };

  const handleUploadDoc = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = (e: any) => {
      if (e.target.files[0]) {
        setHasDocument(true);
        alert(`Documento "${e.target.files[0].name}" enviado com sucesso!`);
      }
    };
    input.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group"
        >
          <div className="p-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="font-semibold text-sm">Voltar</span>
        </button>
        {!isVisualizador && (
          <div className="flex items-center gap-3">
            <Link 
              to={`/licenca/editar/${license.id}`}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold shadow-sm"
            >
              <Edit3 size={16} />
              Editar
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-black shadow-md">
              <ShieldCheck size={16} />
              Regularizar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* License Data Card */}
          <div className="bg-white border rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded mb-2 uppercase tracking-widest border border-emerald-100">
                  REGISTRO {license.id.toUpperCase()}
                </span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{license.tipo_licenca}</h1>
                <p className="text-slate-500 font-semibold mt-1">{license.filial}</p>
              </div>
              <StatusBadgeLarge status={status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t pt-8">
              <DetailItem label="CNPJ da Unidade" value={license.cnpj} />
              <DetailItem label="Rota / Região" value={license.rota} />
              <DetailItem label="Órgão Emissor" value={license.orgao_emissor} />
              <DetailItem 
                label="Vencimento" 
                value={new Date(license.data_vencimento).toLocaleDateString('pt-BR')} 
                highlight={status === LicenseStatus.VENCIDA || status === LicenseStatus.A_VENCER}
              />
              <div className="md:col-span-2">
                <DetailItem label="Observações e Condicionantes" value={license.observacao} />
              </div>
              {license.alert_horizons && (
                 <div className="md:col-span-2 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Horizontes de Notificação Configurados</p>
                    <div className="flex flex-wrap gap-2">
                      {license.alert_horizons.map(h => (
                        <span key={h} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-md text-xs font-black border border-slate-200">
                          D-{h}
                        </span>
                      ))}
                    </div>
                 </div>
              )}
            </div>
          </div>

          {/* Document Management Card */}
          <div className="bg-white border rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-emerald-600" />
                Documento Digitalizado
              </h3>
              
              <div className="flex items-center gap-4">
                {hasDocument && (
                  <a 
                    href={pdfSampleUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-600 font-bold text-xs hover:text-emerald-700 flex items-center gap-1.5 transition-all"
                  >
                    <Download size={14} /> Baixar PDF Original
                  </a>
                )}
                {!isVisualizador && (
                  <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                    <button 
                      onClick={handleUploadDoc}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="Upload de Documento"
                    >
                      <Upload size={20} />
                    </button>
                    {hasDocument && (
                      <button 
                        onClick={handleDeleteDoc}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Excluir Documento"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {hasDocument ? (
              <div className="space-y-4">
                {/* PDF Viewer Interface */}
                <div className={`relative rounded-xl border-2 border-slate-100 overflow-hidden bg-slate-50 transition-all duration-500 ${showPreview ? 'h-[600px]' : 'h-[300px]'}`}>
                  {showPreview ? (
                    <iframe 
                      src={pdfSampleUrl} 
                      className="w-full h-full border-none"
                      title="PDF Preview"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                        <FileText size={40} className="text-emerald-500" />
                      </div>
                      <p className="text-slate-400 text-sm font-bold mb-1">Documento: <span className="text-slate-700 uppercase">{license.pdf_url || 'licenca_ambiental.pdf'}</span></p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6">Visualização Segura Ativa</p>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setShowPreview(true)}
                          className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2"
                        >
                          <Eye size={16} /> Carregar Visualização
                        </button>
                        <a 
                          href={pdfSampleUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-6 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                          <Maximize2 size={16} /> Abrir em Tela Cheia
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {showPreview && (
                    <button 
                      onClick={() => setShowPreview(false)}
                      className="absolute bottom-4 right-4 bg-slate-900/80 text-white p-2 rounded-lg hover:bg-slate-900 transition-all text-xs font-bold flex items-center gap-2 backdrop-blur-sm"
                    >
                      <X size={14} /> Fechar Prévia
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-slate-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                <div className="text-center max-w-xs px-6">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100 shadow-sm">
                    <AlertCircle size={32} className="text-amber-500" />
                  </div>
                  <h4 className="text-slate-800 font-black mb-1">Arquivo Ausente</h4>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed font-medium">Esta licença não possui um arquivo PDF associado. O upload é obrigatório para conformidade.</p>
                  <button 
                    onClick={handleUploadDoc}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                  >
                    <Upload size={18} /> Fazer Upload da Licença
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Status Column */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-tighter text-sm">
              <History size={18} className="text-amber-500" />
              Rastro de Auditoria
            </h3>
            <div className="space-y-4">
              {alerts.length > 0 ? alerts.map(alert => (
                <div key={alert.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4 transition-all hover:border-slate-200 hover:shadow-sm">
                  <div className={`shrink-0 p-2.5 h-fit rounded-xl ${alert.tipo === AlertChannel.WHATSAPP ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {alert.tipo === AlertChannel.WHATSAPP ? <MessageCircle size={18} /> : <Mail size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{alert.tipo} ENVIADO</p>
                      {alert.status === 'lido' && <CheckCircle2 size={12} className="text-emerald-500" />}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold mb-1">MOTOR: REGRA D-{alert.dias_antes}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <Clock size={10} /> {alert.enviado_em}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="py-10 text-center bg-slate-50/50 rounded-xl border border-dashed">
                  <p className="text-xs text-slate-400 font-bold italic">Sem disparos registrados.</p>
                </div>
              )}
            </div>
            <Link to="/historico" className="block text-center mt-6 text-[10px] font-black text-emerald-600 hover:text-emerald-700 hover:underline tracking-widest uppercase border-t pt-4">
              Log Completo de Notificações
            </Link>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:rotate-12 transition-transform">
              <ShieldCheck size={80} />
            </div>
            <h3 className="font-black mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
              <AlertCircle size={20} className="text-emerald-400" />
              Status Ambiental
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed relative z-10">
              {status === LicenseStatus.VENCIDA 
                ? 'ALERTA MÁXIMO: Licença fora de validade. Risco de multas e interdição. Inicie a renovação imediatamente.' 
                : status === LicenseStatus.A_VENCER 
                  ? 'ALERTA DE PRAZO: Renovação necessária nos próximos meses. Documentação deve ser preparada.'
                  : 'CONFORMIDADE: Licença dentro do prazo legal. Continue monitorando as condicionantes trimestrais.'}
            </p>
            <button className="w-full py-3.5 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-500 transition-all shadow-lg active:scale-95 relative z-10">
              Gerar Relatório de Auditoria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
    <p className={`text-sm font-bold leading-tight ${highlight ? 'text-red-600 font-black underline decoration-2' : 'text-slate-800'}`}>
      {value}
    </p>
  </div>
);

const StatusBadgeLarge = ({ status }: { status: LicenseStatus }) => {
  const configs = {
    [LicenseStatus.VIGENTE]: { text: 'Vigente', class: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    [LicenseStatus.A_VENCER]: { text: 'A Vencer', class: 'bg-amber-50 text-amber-600 border-amber-200' },
    [LicenseStatus.VENCIDA]: { text: 'Vencida', class: 'bg-red-50 text-red-600 border-red-200 shadow-sm shadow-red-100' },
  };
  const config = configs[status];
  return (
    <div className={`px-6 py-2.5 rounded-full border-2 ${config.class} font-black text-xs flex items-center gap-3 tracking-widest shadow-sm`}>
      <div className={`w-2.5 h-2.5 rounded-full ${status === LicenseStatus.VIGENTE ? 'bg-emerald-500' : status === LicenseStatus.A_VENCER ? 'bg-amber-500' : 'bg-red-500 animate-ping'}`} />
      {config.text.toUpperCase()}
    </div>
  );
};

// Componente simples de ícone X para o botão de fechar prévia
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default LicenseDetail;
