import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, IndianRupee, TrendingUp, TrendingDown, Plus, Download, Search, Filter, PieChart } from 'lucide-react';
import { invoiceService } from '../../services/invoiceService';

const invoices = [
  { id: 'INV-2026-001', client: 'Municipal Corp.', amount: '₹1.2 Cr', status: 'Paid', date: 'May 10, 2026' },
  { id: 'INV-2026-002', client: 'Metro Rail Corp.', amount: '₹4.5 Cr', status: 'Pending', date: 'May 08, 2026' },
  { id: 'INV-2026-003', client: 'Elite Real Estate', amount: '₹85 L', status: 'Overdue', date: 'Apr 25, 2026' },
];

const FinancialsView = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'expenses'>('invoices');

  const handleDownload = (inv: any) => {
    invoiceService.generatePDF({
      invoiceNumber: inv.id,
      date: inv.date,
      clientName: inv.client,
      clientAddress: 'Corporate Office, Mumbai, Maharashtra',
      items: [
        { description: 'Civil Construction Works - Phase 1', quantity: 1, unitPrice: 10000000, total: 10000000 },
        { description: 'Material Procurement (Cement & Steel)', quantity: 1, unitPrice: 2000000, total: 2000000 },
      ],
      taxRate: 18,
      totalAmount: 12000000
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Financials</h2>
          <p className="text-slate-500 text-sm">Monitor revenue, manage GST invoices, and track site expenses</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 glass rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-all font-bold">
            <PieChart size={18} />
            Analytics
          </button>
          <button className="btn-gold flex items-center gap-2">
            <Plus size={18} />
            {activeTab === 'invoices' ? 'Create Invoice' : 'Add Expense'}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹12.4 Cr', trend: '+8%', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Pending Dues', value: '₹5.8 Cr', trend: '+12%', icon: IndianRupee, color: 'text-primary' },
          { label: 'Site Expenses', value: '₹2.1 Cr', trend: '+4%', icon: TrendingDown, color: 'text-red-500' },
          { label: 'Net Profit', value: '₹4.5 Cr', trend: '+15%', icon: FileText, color: 'text-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
               </div>
               <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.trend}</span>
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="flex border-b border-white/5 bg-white/2">
          <button 
            onClick={() => setActiveTab('invoices')}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'invoices' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-white'}`}
          >
            Invoices
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'expenses' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-white'}`}
          >
            Expenses
          </button>
        </div>

        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`} 
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
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">ID</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Entity / Client</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-right">Amount</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">Status</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Date</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={inv.id} className="border-b border-white/5 hover:bg-white/2 transition-colors group">
                  <td className="p-4 font-mono text-xs text-primary font-bold">{inv.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-sm">{inv.client}</div>
                    <div className="text-[10px] text-slate-500 uppercase">GST Registered</div>
                  </td>
                  <td className="p-4 text-right font-bold text-sm">{inv.amount}</td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        inv.status === 'Paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        inv.status === 'Pending' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-400">{inv.date}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleDownload(inv)}
                      className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialsView;
