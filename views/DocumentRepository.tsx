
import React, { useState } from 'react';
import { 
  FolderOpen, 
  Search, 
  Download, 
  FileText, 
  Upload, 
  Filter, 
  MoreVertical,
  Calendar,
  Eye
} from 'lucide-react';
import { MOCK_LICENSES } from '../constants';

const DocumentRepository: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = MOCK_LICENSES.filter(l => !!l.pdf_url && (
    l.filial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.tipo_licenca.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Repositório de Documentos</h1>
          <p className="text-slate-500">Central de arquivos e downloads de licenças ambientais.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm">
            <Upload size={18} />
            Novo Upload
          </button>
        </div>
      </div>

      <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por filial ou nome do arquivo..."
            className="pl-10 pr-4 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 text-slate-600 text-sm">
            <Filter size={16} />
            Filtrar
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50 text-slate-600 text-sm">
            <Calendar size={16} />
            Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FileText className="text-emerald-600" size={24} />
              </div>
              <button className="p-1 text-slate-400 hover:text-slate-600">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm truncate" title={doc.pdf_url}>{doc.pdf_url}</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{doc.tipo_licenca}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium truncate">{doc.filial}</p>
                <p className="text-[10px] text-slate-400">Criado em: {new Date(doc.created_at).toLocaleDateString()}</p>
              </div>
              <div className="pt-2 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors">
                  <Eye size={14} />
                  Ver
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors">
                  <Download size={14} />
                  Baixar
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State Upload Card */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-300 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Upload className="text-slate-400 group-hover:text-emerald-500" size={24} />
          </div>
          <p className="text-sm font-bold text-slate-600">Adicionar Arquivo</p>
          <p className="text-xs text-slate-400 mt-1 leading-tight">Envie documentos extras ou <br/>comprovantes de renovação.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentRepository;
