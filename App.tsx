
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Menu,
  X,
  History,
  FileBadge,
  Users,
  FolderOpen
} from 'lucide-react';

import Dashboard from './views/Dashboard';
import LicenseList from './views/LicenseList';
import NewLicense from './views/NewLicense';
import EditLicense from './views/EditLicense'; // Importando a nova view
import LicenseDetail from './views/LicenseDetail';
import AlertSettings from './views/AlertSettings';
import AlertHistoryView from './views/AlertHistoryView';
import DocumentRepository from './views/DocumentRepository';
import UserManagement from './views/UserManagement';
import Login from './views/Login';

import { MOCK_USER } from './constants';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Login onLogin={(user) => {
      setIsAuthenticated(true);
      if (user) setCurrentUser(user);
    }} />;
  }

  const isAdmin = currentUser.perfil === UserProfile.ADMIN;
  const isVisualizador = currentUser.perfil === UserProfile.VISUALIZADOR;

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        {/* Mobile Sidebar Toggle */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 text-white rounded-full shadow-lg"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} transition-all duration-300 bg-emerald-900 text-white flex flex-col fixed h-full lg:relative z-40`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <FileBadge size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">EcoGuard</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <SidebarItem to="/licencas" icon={<FileText size={20} />} label="Licenças" />
            {!isVisualizador && <SidebarItem to="/nova" icon={<PlusCircle size={20} />} label="Nova Licença" />}
            <SidebarItem to="/documentos" icon={<FolderOpen size={20} />} label="Documentos" />
            <SidebarItem to="/historico" icon={<History size={20} />} label="Histórico Alertas" />
            {isAdmin && <SidebarItem to="/usuarios" icon={<Users size={20} />} label="Usuários" />}
            {isAdmin && <SidebarItem to="/configuracoes" icon={<Settings size={20} />} label="Configurações" />}
          </nav>

          <div className="p-4 mt-auto border-t border-emerald-800">
            <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-emerald-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold">
                {currentUser.nome.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.nome}</p>
                <p className="text-xs text-emerald-400 truncate">{currentUser.perfil}</p>
              </div>
              <button onClick={() => setIsAuthenticated(false)}>
                <LogOut size={16} className="text-emerald-400 hover:text-white" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
               {!isSidebarOpen && (
                 <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-slate-100 rounded-md">
                   <Menu size={20} />
                 </button>
               )}
               <h2 className="text-lg font-semibold text-slate-800 hidden md:block">Sistema de Controle Ambiental</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell size={20} className="text-slate-500 cursor-pointer hover:text-emerald-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">2</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              {!isVisualizador && (
                <Link to="/nova" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <PlusCircle size={16} />
                  <span className="hidden sm:inline">Nova Licença</span>
                </Link>
              )}
            </div>
          </header>

          <div className="p-4 lg:p-8 overflow-auto flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/licencas" element={<LicenseList currentUser={currentUser} />} />
              <Route path="/licenca/:id" element={<LicenseDetail currentUser={currentUser} />} />
              <Route path="/licenca/editar/:id" element={<EditLicense />} />
              <Route path="/nova" element={<NewLicense />} />
              <Route path="/historico" element={<AlertHistoryView />} />
              <Route path="/documentos" element={<DocumentRepository />} />
              <Route path="/usuarios" element={<UserManagement />} />
              <Route path="/configuracoes" element={<AlertSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

const SidebarItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? 'bg-emerald-600 text-white shadow-md' 
          : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
      {isActive && <ChevronRight size={14} className="ml-auto" />}
    </Link>
  );
};

export default App;
