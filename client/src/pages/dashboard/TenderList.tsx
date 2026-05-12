import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle2, XCircle, Search, Filter, Download, MoreHorizontal, AlertCircle } from 'lucide-react';
import NewTenderModal from '../../components/dashboard/NewTenderModal';
import { tenderService, Tender } from '../../services/tenderService';

const TenderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = tenderService.subscribeTenders((data) => {
      setTenders(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: Tender['status']) => {
    try {
      await tenderService.updateTenderStatus(id, status);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Under Review': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Won': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Lost': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Tender Management</h2>
          <p className="text-slate-500 text-sm">Monitor and manage project bids and submissions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-gold flex items-center gap-2"
        >
          <FileText size={18} />
          Submit New Tender
        </button>
      </div>

      <NewTenderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="glass-card overflow-hidden !p-0">
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/2">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search tenders..." 
              className="w-full bg-secondary/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 border border-white/10 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
              <Filter size={14} /> Filter
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 border border-white/10 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/1">
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Tender ID</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Project Details</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-right">Quote Value</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">Status</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Submission Date</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 italic text-sm">No tenders submitted yet.</td>
                </tr>
              ) : (
                tenders.map((tender) => (
                  <tr key={tender.id} className="border-b border-white/5 hover:bg-white/2 transition-colors group">
                    <td className="p-4 font-mono text-xs text-primary font-bold truncate max-w-[100px]">{tender.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-sm mb-1">{tender.title}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tight">{tender.client}</div>
                    </td>
                    <td className="p-4 text-right font-bold text-sm">₹{tender.value}</td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(tender.status)}`}>
                          {tender.status === 'Won' && <CheckCircle2 size={12} />}
                          {tender.status === 'Lost' && <XCircle size={12} />}
                          {tender.status === 'Submitted' && <Clock size={12} />}
                          {tender.status === 'Under Review' && <AlertCircle size={12} />}
                          {tender.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-400">{new Date(tender.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {tender.fileUrl && (
                          <a href={tender.fileUrl} target="_blank" rel="noreferrer" className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                            <Download size={16} />
                          </a>
                        )}
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenderList;
