import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, FileText, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 45, expenses: 32 },
  { name: 'Feb', revenue: 52, expenses: 38 },
  { name: 'Mar', revenue: 48, expenses: 42 },
  { name: 'Apr', revenue: 61, expenses: 45 },
  { name: 'May', revenue: 55, expenses: 40 },
  { name: 'Jun', revenue: 67, expenses: 48 },
];

const projectsData = [
  { name: 'Rudra Heights', progress: 85, color: '#C89B3C' },
  { name: 'Metro Rail', progress: 42, color: '#3B82F6' },
  { name: 'NH-44', progress: 15, color: '#EF4444' },
  { name: 'Smart City', progress: 60, color: '#10B981' },
];

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card flex items-center justify-between"
  >
    <div>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <div className={`flex items-center gap-1 mt-2 text-[10px] font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend} vs last month
      </div>
    </div>
    <div className={`p-4 rounded-2xl bg-white/5 ${color}`}>
      <Icon size={24} />
    </div>
  </motion.div>
);

const Overview = () => {
  return (
    <div className="space-y-8">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Revenue" value="₹12.4 Cr" trend="+12.5%" icon={TrendingUp} color="text-primary" />
        <StatCard label="Active Projects" value="08" trend="+2" icon={Briefcase} color="text-blue-500" />
        <StatCard label="Staff On-Site" value="156" trend="-5%" icon={Users} color="text-green-500" />
        <StatCard label="Pending Tenders" value="14" trend="+3" icon={FileText} color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <Activity size={20} className="text-primary" />
              Financial Growth
            </h3>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-primary"></span> Revenue
               </div>
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-500 ml-4">
                  <span className="h-2 w-2 rounded-full bg-slate-600"></span> Expenses
               </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C89B3C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C89B3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C89B3C" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                <Area type="monotone" dataKey="expenses" stroke="#475569" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projects Status */}
        <div className="glass-card">
           <h3 className="font-bold mb-8 text-lg">Project Health</h3>
           <div className="space-y-6">
              {projectsData.map((project, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold">{project.name}</span>
                    <span className="text-slate-500 font-mono">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-12 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
              <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-2">Efficiency Index</p>
              <div className="flex items-end gap-2">
                 <span className="text-4xl font-bold">92%</span>
                 <span className="text-green-500 text-xs font-bold mb-1">+4.2%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
