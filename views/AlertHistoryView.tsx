
import React from 'react';
import { History, Mail, MessageCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { MOCK_ALERTS, MOCK_LICENSES } from '../constants';
import { AlertChannel } from '../types';

const AlertHistoryView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Histórico de Alertas</h1>
        <p className="text-slate-500">Log detalhado de todas as comunicações enviadas pelo motor de alertas.</p>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Data/Hora</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Licença / Filial</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Canal</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Regra (Dias)</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Destinatário</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_ALERTS.map(alert => {
                const license = MOCK_LICENSES.find(l => l.id === alert.licenca_id);
                return (
                  <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{alert.enviado_em}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{license?.tipo_licenca}</p>
                      <p className="text-xs text-slate-400">{license?.filial}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {alert.tipo === AlertChannel.WHATSAPP ? (
                          <MessageCircle size={16} className="text-green-500" />
                        ) : (
                          <Mail size={16} className="text-blue-500" />
                        )}
                        <span className="text-xs font-bold text-slate-600 uppercase">{alert.tipo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">D - {alert.dias_antes}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{alert.destinatario}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {alert.status === 'lido' ? (
                          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                            <CheckCircle size={14} /> LIDO
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                            <Clock size={14} /> ENVIADO
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50 border-t flex justify-center">
            <p className="text-xs text-slate-400 italic flex items-center gap-2">
                <History size={14} /> O histórico completo é mantido por até 24 meses.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AlertHistoryView;
