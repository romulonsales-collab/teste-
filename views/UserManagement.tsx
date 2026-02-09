
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Shield, 
  Mail, 
  MoreVertical, 
  Edit, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { UserProfile } from '../types';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = MOCK_USERS.filter(u => 
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Usuários</h1>
          <p className="text-slate-500">Controle de acessos, perfis e permissões da plataforma.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm">
          <UserPlus size={18} />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou e-mail..."
            className="pl-10 pr-4 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuário</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Perfil / Acesso</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      {user.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{user.nome}</p>
                      <p className="text-[10px] text-slate-400">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Mail size={12} /> {user.email}
                    </div>
                    <p className="text-[10px] text-slate-400">{user.telefone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <RoleBadge role={user.perfil} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit">
          <Shield size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-800 text-sm">Controle de Documentos</h4>
          <p className="text-xs text-blue-700 mt-1 max-w-2xl leading-relaxed">
            Usuários com perfil <b>VISUALIZADOR</b> possuem acesso restrito. Eles podem visualizar licenças e baixar documentos, mas não podem editar dados, cadastrar novas licenças ou alterar configurações de alertas.
          </p>
        </div>
      </div>
    </div>
  );
};

const RoleBadge = ({ role }: { role: UserProfile }) => {
  const configs = {
    [UserProfile.ADMIN]: 'bg-purple-100 text-purple-700 border-purple-200',
    [UserProfile.GESTOR]: 'bg-blue-100 text-blue-700 border-blue-200',
    [UserProfile.TECNICO]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [UserProfile.VISUALIZADOR]: 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${configs[role]}`}>
      {role}
    </span>
  );
};

export default UserManagement;
