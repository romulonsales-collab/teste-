
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, FileText, ExternalLink, ArrowUpDown, PlusCircle, Edit3 } from 'lucide-react';
import { MOCK_LICENSES, getStatus } from '../constants';
import { LicenseStatus, UserProfile, User } from '../types';

const LicenseList: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isVisualizador = currentUser.perfil === UserProfile.VISUALIZADOR;
  
  const filteredLicenses = MOCK_LICENSES.filter(l => 
    l.filial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.tipo_licenca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.orgao_emissor.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(l => ({ ...l, status: getStatus(l.data_vencimento) }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lista de Licenças</h1>
          <p className="text-slate-500">Repositório central de toda documentação ambiental.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isVisualizador && (
            <Link to="/nova" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
              <PlusCircle size={16} /> Nova
            </Link>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por filial, tipo ou órgão..."
              className="pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2 cursor-pointer">Licença / Tipo <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Filial</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Órgão</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLicenses.map(license => (
                <tr key={license.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{license.tipo_licenca}</p>
                        <p className="text-xs text-slate-400">CNPJ: {license.cnpj}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 font-medium">{license.filial}</p>
                    <p className="text-xs text-slate-400">{license.rota}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">{license.orgao_emissor}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700">
                      {new Date(license.data_vencimento).toLocaleDateString('pt-BR')}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={license.status!} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!isVisualizador && (
                        <Link 
                          to={`/licenca/editar/${license.id}`}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit3 size={18} />
                        </Link>
                      )}
                      <Link 
                        to={`/licenca/${license.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        {isVisualizador ? 'Ver Documento' : 'Detalhes'}
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLicenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Nenhuma licença encontrada para os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: LicenseStatus }) => {
  const configs = {
    [LicenseStatus.VIGENTE]: { text: 'Vigente', class: 'bg-emerald-100 text-emerald-700' },
    [LicenseStatus.A_VENCER]: { text: 'A Vencer', class: 'bg-amber-100 text-amber-700' },
    [LicenseStatus.VENCIDA]: { text: 'Vencida', class: 'bg-red-100 text-red-700' },
  };

  const config = configs[status];
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block min-w-[80px] text-center ${config.class}`}>
      {config.text}
    </span>
  );
};

export default LicenseList;
