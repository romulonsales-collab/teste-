
import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CheckCircle2, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { MOCK_LICENSES, getStatus } from '../constants';
import { LicenseStatus } from '../types';

const Dashboard: React.FC = () => {
  const licensesWithStatus = MOCK_LICENSES.map(l => ({ ...l, status: getStatus(l.data_vencimento) }));
  
  const stats = {
    vigente: licensesWithStatus.filter(l => l.status === LicenseStatus.VIGENTE).length,
    aVencer: licensesWithStatus.filter(l => l.status === LicenseStatus.A_VENCER).length,
    vencida: licensesWithStatus.filter(l => l.status === LicenseStatus.VENCIDA).length,
  };

  const pieData = [
    { name: 'Vigentes', value: stats.vigente, color: '#10b981' },
    { name: 'A Vencer', value: stats.aVencer, color: '#f59e0b' },
    { name: 'Vencidas', value: stats.vencida, color: '#ef4444' },
  ];

  const barData = [
    { month: 'Jan', vigentes: 12, aVencer: 2 },
    { month: 'Fev', vigentes: 15, aVencer: 4 },
    { month: 'Mar', vigentes: 10, aVencer: 1 },
    { month: 'Abr', vigentes: 18, aVencer: 6 },
    { month: 'Mai', vigentes: 20, aVencer: 8 },
  ];

  const upcoming = [...licensesWithStatus]
    .filter(l => l.status !== LicenseStatus.VENCIDA)
    .sort((a, b) => new Date(a.data_vencimento).getTime() - new Date(b.data_vencimento).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard de Controle</h1>
          <p className="text-slate-500">Visão geral do status ambiental de todas as filiais.</p>
        </div>
        <div className="bg-white p-2 border rounded-lg flex items-center gap-4 text-xs font-medium text-slate-500 shadow-sm">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Vigente</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500"></div> A Vencer (90d)</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> Vencida</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Licenças Vigentes" 
          value={stats.vigente} 
          icon={<CheckCircle2 className="text-emerald-500" />} 
          color="border-emerald-500"
          bg="bg-emerald-50"
        />
        <StatCard 
          title="Próximas do Vencimento" 
          value={stats.aVencer} 
          icon={<Clock className="text-amber-500" />} 
          color="border-amber-500"
          bg="bg-amber-50"
          subtitle="Vencem nos próximos 90 dias"
        />
        <StatCard 
          title="Licenças Vencidas" 
          value={stats.vencida} 
          icon={<AlertTriangle className="text-red-500" />} 
          color="border-red-500"
          bg="bg-red-50"
          subtitle="Ação imediata necessária"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Status Proporcional</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming List */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Próximos Vencimentos</h3>
            <Link to="/licencas" className="text-emerald-600 text-xs font-semibold hover:underline flex items-center gap-1">
              Ver todas <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {upcoming.map(license => (
              <Link 
                key={license.id} 
                to={`/licenca/${license.id}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
              >
                <div className={`w-2 h-10 rounded-full ${license.status === LicenseStatus.A_VENCER ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{license.tipo_licenca}</p>
                  <p className="text-xs text-slate-500 truncate">{license.filial}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-700">{new Date(license.data_vencimento).toLocaleDateString()}</p>
                  <p className="text-[10px] text-slate-400">Vencimento</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, bg, subtitle }) => (
  <div className={`bg-white p-6 rounded-xl border-l-4 ${color} shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
      <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
  </div>
);

export default Dashboard;
