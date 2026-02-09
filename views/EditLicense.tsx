
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Upload, 
  Info, 
  Camera, 
  Loader2, 
  Bell, 
  Plus, 
  FileText, 
  Trash2, 
  AlertCircle 
} from 'lucide-react';
import { MOCK_LICENSES } from '../constants';
import { LicenseType } from '../types';

const EditLicense: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertHorizons, setAlertHorizons] = useState<number[]>([]);
  const [newHorizon, setNewHorizon] = useState<string>('');
  const [hasDocument, setHasDocument] = useState(true);
  
  const [formData, setFormData] = useState({
    filial: '',
    rota: '',
    cnpj: '',
    tipo: '',
    orgao: '',
    vencimento: '',
    observacao: ''
  });

  useEffect(() => {
    const license = MOCK_LICENSES.find(l => l.id === id);
    if (license) {
      setFormData({
        filial: license.filial,
        rota: license.rota,
        cnpj: license.cnpj,
        tipo: license.tipo_licenca,
        orgao: license.orgao_emissor,
        vencimento: license.data_vencimento,
        observacao: license.observacao
      });
      setAlertHorizons(license.alert_horizons || [90, 60, 30]);
      setHasDocument(!!license.pdf_url);
    }
  }, [id]);

  const addHorizon = () => {
    const val = parseInt(newHorizon);
    if (!isNaN(val) && !alertHorizons.includes(val)) {
      setAlertHorizons([...alertHorizons, val].sort((a, b) => b - a));
      setNewHorizon('');
    }
  };

  const removeHorizon = (val: number) => {
    setAlertHorizons(alertHorizons.filter(h => h !== val));
  };

  const handleDeleteDocument = () => {
    if (window.confirm('Tem certeza que deseja excluir o documento PDF associado? Esta ação não pode ser desfeita.')) {
      setHasDocument(false);
    }
  };

  const handleUploadNew = () => {
    // Simular abertura de seletor de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setHasDocument(true);
        alert(`Documento "${file.name}" selecionado para upload.`);
      }
    };
    input.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular chamada de API
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/licencas');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Editar Licença</h1>
          <p className="text-slate-500">Atualize as informações do documento ambiental.</p>
        </div>
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-slate-800 border-b pb-4 mb-4">Dados da Licença</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Filial / Unidade</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={formData.filial}
                  onChange={e => setFormData({...formData, filial: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.cnpj}
                    onChange={e => setFormData({...formData, cnpj: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rota Logística</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.rota}
                    onChange={e => setFormData({...formData, rota: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Licença</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.tipo}
                    onChange={e => setFormData({...formData, tipo: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Órgão Emissor</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.orgao}
                    onChange={e => setFormData({...formData, orgao: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Vencimento</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={formData.vencimento}
                  onChange={e => setFormData({...formData, vencimento: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Observações Adicionais</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                  value={formData.observacao}
                  onChange={e => setFormData({...formData, observacao: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-slate-800 border-b pb-4 mb-4 flex items-center gap-2">
              <Bell size={18} className="text-emerald-600" />
              Horizontes de Notificação (Alertas)
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {alertHorizons.map(h => (
                <div key={h} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 font-bold text-sm">
                  {h === 0 ? 'Vencimento' : `${h} dias`}
                  <button type="button" onClick={() => removeHorizon(h)} className="text-emerald-400 hover:text-emerald-600">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 max-w-xs">
              <input 
                type="number" 
                placeholder="Ex: 15, 45"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                value={newHorizon}
                onChange={e => setNewHorizon(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHorizon())}
              />
              <button 
                type="button" 
                onClick={addHorizon}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-slate-800 border-b pb-4 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-emerald-600" />
              Gestão de Documento
            </h3>
            
            {hasDocument ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-slate-50 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded text-emerald-600">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">{id}.pdf</p>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Documento PDF Ativo</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleDeleteDocument}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Excluir Documento"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button" 
                    onClick={handleUploadNew}
                    className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-all shadow-sm"
                  >
                    <Upload size={14} /> Substituir
                  </button>
                  <button 
                    type="button" 
                    className="flex items-center justify-center gap-2 py-2.5 border-2 border-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all"
                  >
                    <Camera size={14} /> Scan
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center">
                  <AlertCircle size={32} className="mx-auto text-amber-400 mb-2 opacity-50" />
                  <p className="text-xs font-bold text-slate-500 mb-1">Nenhum documento anexado</p>
                  <p className="text-[10px] text-slate-400">Realize o upload do arquivo para manter a conformidade.</p>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleUploadNew}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md"
                >
                  <Upload size={18} /> Upload Novo Documento
                </button>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-slate-50">
               <p className="text-[10px] text-slate-400 italic leading-tight">
                 Tipos aceitos: PDF. Tamanho máximo: 15MB.
               </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
            <div className="flex gap-3">
              <Info size={20} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 text-xs mb-1">Aviso</h4>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  As alterações nos horizontes de notificação afetarão os próximos alertas agendados para esta licença.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Salvando...</> : <><Save size={20} /> Salvar Alterações</>}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="w-full py-3 border rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
            >
              Descartar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLicense;
