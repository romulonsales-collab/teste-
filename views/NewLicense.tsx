
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Upload, Info, Camera, Loader2, Bell, Plus, Minus } from 'lucide-react';
import { LicenseType } from '../types';

const NewLicense: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertHorizons, setAlertHorizons] = useState<number[]>([90, 60, 30]);
  const [newHorizon, setNewHorizon] = useState<string>('');
  
  const [formData, setFormData] = useState({
    filial: '',
    rota: '',
    cnpj: '',
    tipo: LicenseType.LO,
    orgao: '',
    vencimento: '',
    observacao: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/licencas');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cadastrar Nova Licença</h1>
          <p className="text-slate-500">Insira as informações do documento para iniciar o monitoramento.</p>
        </div>
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-slate-800 border-b pb-4 mb-4">Dados da Licença</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Filial / Unidade</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Unidade Operacional Jacareí"
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
                    placeholder="00.000.000/0000-00"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.cnpj}
                    onChange={e => setFormData({...formData, cnpj: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rota Logística</label>
                  <input 
                    type="text" 
                    placeholder="Ex: SP-RJ Principal"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.rota}
                    onChange={e => setFormData({...formData, rota: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Licença</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    value={formData.tipo}
                    onChange={e => setFormData({...formData, tipo: e.target.value as LicenseType})}
                  >
                    {Object.values(LicenseType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Órgão Emissor</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: IBAMA, CETESB..."
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
                  placeholder="Condicionantes relevantes..."
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
            <p className="text-xs text-slate-500 mb-4">Defina em quais intervalos (dias antes do vencimento) o sistema deve disparar alertas automáticos para esta licença.</p>
            
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
                placeholder="Ex: 10, 30, 160"
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

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-slate-800 border-b pb-4 mb-4 flex items-center gap-2">
              <Upload size={18} className="text-emerald-600" />
              Documento Digitalizado
            </h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all group cursor-pointer">
              <Upload className="mx-auto text-slate-300 group-hover:text-emerald-500 mb-2" size={32} />
              <p className="text-xs font-bold text-slate-600">Arraste o PDF aqui</p>
              <input type="file" className="hidden" accept="application/pdf" />
            </div>
            
            <button type="button" className="w-full mt-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <Camera size={16} />
              Escanear com Câmera
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
            <div className="flex gap-3">
              <Info size={20} className="text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 text-xs mb-1">Dica de Gestão</h4>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Para licenças complexas (LO), recomenda-se o horizonte de <b>120 dias</b> para garantir tempo hábil de renovação conforme legislação.
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
              {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processando...</> : <><Save size={20} /> Salvar Licença</>}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="w-full py-3 border rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewLicense;
