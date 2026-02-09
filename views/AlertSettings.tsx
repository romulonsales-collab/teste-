
import React, { useState } from 'react';
import { Bell, Mail, MessageCircle, Save, Check } from 'lucide-react';

const AlertSettings: React.FC = () => {
  const [activeDays, setActiveDays] = useState([90, 60, 30, 15, 7, 0]);
  const [channels, setChannels] = useState(['email', 'whatsapp']);
  const [isSaved, setIsSaved] = useState(false);

  const toggleDay = (day: number) => {
    setActiveDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const toggleChannel = (channel: string) => {
    setChannels(prev => prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configuração de Alertas</h1>
        <p className="text-slate-500">Personalize como e quando a equipe deve ser notificada.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Bell size={20} className="text-amber-500" />
            Prazos de Notificação
          </h3>
          <p className="text-sm text-slate-500">Selecione quantos dias antes do vencimento o sistema deve disparar alertas automáticos:</p>
          
          <div className="grid grid-cols-3 gap-3">
            {[120, 90, 60, 45, 30, 15, 7, 3, 0].map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`py-3 rounded-lg border font-bold text-sm transition-all ${
                  activeDays.includes(day) 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                    : 'bg-white text-slate-400 hover:border-emerald-200'
                }`}
              >
                {day === 0 ? 'Vencimento' : `${day} dias`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Mail size={20} className="text-emerald-600" />
              Canais de Disparo
            </h3>
            <div className="space-y-3">
              <ChannelToggle 
                label="E-mail Corporativo" 
                icon={<Mail size={20} />} 
                active={channels.includes('email')}
                onToggle={() => toggleChannel('email')}
              />
              <ChannelToggle 
                label="WhatsApp (API)" 
                icon={<MessageCircle size={20} />} 
                active={channels.includes('whatsapp')}
                onToggle={() => toggleChannel('whatsapp')}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Destinatários Padrão</h3>
            <div className="space-y-4">
              <RecipientItem role="Admin / TI" name="Equipe de TI" />
              <RecipientItem role="Gestor Ambiental" name="Gestão Central" />
              <RecipientItem role="Técnico Local" name="Responsável pela Filial" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button 
          onClick={handleSave}
          className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
            isSaved ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
          }`}
        >
          {isSaved ? <><Check size={20} /> Configurações Salvas</> : <><Save size={20} /> Salvar Alterações</>}
        </button>
      </div>
    </div>
  );
};

const ChannelToggle = ({ label, icon, active, onToggle }: any) => (
  <button 
    onClick={onToggle}
    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
      active ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`${active ? 'text-emerald-600' : 'text-slate-400'}`}>
        {icon}
      </div>
      <span className={`font-bold ${active ? 'text-emerald-900' : 'text-slate-500'}`}>{label}</span>
    </div>
    <div className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </button>
);

const RecipientItem = ({ role, name }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{role}</p>
      <p className="text-sm font-semibold text-slate-700">{name}</p>
    </div>
    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
  </div>
);

export default AlertSettings;
