
import React, { useState } from 'react';
import { LogIn, Shield, Loader2, FileBadge, ChevronDown } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(selectedUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-950 p-4">
      <div className="max-w-md w-full animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-900/40">
            <FileBadge size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">EcoGuard</h1>
          <p className="text-emerald-400 mt-2 font-medium">Controle de Licenças Ambientais v1.0 MVP</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Simular Acesso como:</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none focus:outline-none transition-all text-sm"
                  value={selectedUser.id}
                  onChange={(e) => {
                    const user = MOCK_USERS.find(u => u.id === e.target.value);
                    if (user) setSelectedUser(user);
                  }}
                >
                  {MOCK_USERS.map(u => (
                    <option key={u.id} value={u.id}>{u.nome} ({u.perfil})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <input 
                disabled
                type="email" 
                value={selectedUser.email}
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  ACESSAR SISTEMA
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
             <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
               <Shield size={12} />
               Ambiente Seguro & Criptografado
             </p>
          </div>
        </div>

        <p className="mt-8 text-center text-emerald-300/50 text-xs italic">
          Dica: Escolha o perfil "VISUALIZADOR" para testar o acesso restrito a documentos.
        </p>
      </div>
    </div>
  );
};

export default Login;
