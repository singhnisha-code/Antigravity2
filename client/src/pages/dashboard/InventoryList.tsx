import React from 'react';
import { motion } from 'framer-motion';
import { Box, Plus, Search, AlertTriangle, ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';

const inventory = [
  { id: 'M-001', name: 'Premium Portland Cement', category: 'Materials', stock: '2,500 Bags', minStock: '500 Bags', status: 'In Stock' },
  { id: 'M-002', name: 'Reinforced Steel Bars (12mm)', category: 'Structural', stock: '12 Tons', minStock: '15 Tons', status: 'Low Stock' },
  { id: 'M-003', name: 'Coarse Aggregate (20mm)', category: 'Materials', stock: '450 m³', minStock: '100 m³', status: 'In Stock' },
  { id: 'M-004', name: 'Electrical Conduit Pipes', category: 'Electrical', stock: '0 Units', minStock: '50 Units', status: 'Out of Stock' },
];

const InventoryList = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Inventory & Assets</h2>
          <p className="text-slate-500 text-sm">Track material stock levels and equipment allocation</p>
        </div>
        <button className="btn-gold flex items-center gap-2">
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Value</div>
            <div className="text-2xl font-bold">₹1.84 Cr</div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Box size={24} />
          </div>
        </div>
        <div className="glass-card flex items-center justify-between border-red-500/10">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Low Stock Alerts</div>
            <div className="text-2xl font-bold text-red-500">03 Items</div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 animate-pulse">
            <AlertTriangle size={24} />
          </div>
        </div>
        <div className="glass-card flex items-center justify-between border-green-500/10">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Recent Procurement</div>
            <div className="text-2xl font-bold text-green-500">₹45.2 L</div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden !p-0">
        <div className="p-4 border-b border-white/5 flex gap-4 bg-white/2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="w-full bg-secondary/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <select className="bg-secondary/50 border border-white/10 rounded-lg py-2 px-4 text-xs focus:outline-none focus:border-primary/50 text-slate-400">
            <option>All Categories</option>
            <option>Materials</option>
            <option>Structural</option>
            <option>Electrical</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/1">
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Item Name</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Category</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">Stock Level</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">Status</th>
                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{item.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-bold text-slate-400 uppercase">{item.category}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-sm font-bold">{item.stock}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Min: {item.minStock}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === 'In Stock' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                       <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"><ArrowUpRight size={14} /></button>
                       <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"><ArrowDownLeft size={14} /></button>
                       <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"><Trash2 size={14} /></button>
                    </div>
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

export default InventoryList;
