import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, Phone, Mail, BadgeCheck, ShieldAlert, Download } from 'lucide-react';
import { payrollService } from '../../services/payrollService';

const staff = [
  { id: 'S-001', name: 'Arjun Verma', role: 'Project Manager', site: 'Rudra Heights', contact: '+91 98765 43210', status: 'On-Site' },
  { id: 'S-002', name: 'Nisha Singh', role: 'Civil Engineer', site: 'Skyline Bridge', contact: '+91 87654 32109', status: 'Off-Duty' },
  { id: 'S-003', name: 'Rahul Mehta', role: 'Site Supervisor', site: 'National Highway', contact: '+91 76543 21098', status: 'On-Site' },
  { id: 'S-004', name: 'Priya Sharma', role: 'Safety Officer', site: 'Smart City IT Park', contact: '+91 65432 10987', status: 'On-Site' },
];

const StaffList = () => {
  const handlePayslip = (member: any) => {
    payrollService.generatePayslipPDF({
      employeeId: member.id,
      employeeName: member.name,
      role: member.role,
      month: 'May',
      year: '2026',
      baseSalary: 45000,
      allowances: 12000,
      deductions: 5000,
      workingDays: 26,
      presentDays: 24
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Staff & HR</h2>
          <p className="text-slate-500 text-sm">Manage employees, roles, and site assignments</p>
        </div>
        <button className="btn-gold flex items-center gap-2">
          <UserPlus size={18} />
          Add Employee
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: '156', icon: Users, color: 'text-primary' },
          { label: 'Currently On-Site', value: '84', icon: BadgeCheck, color: 'text-green-500' },
          { label: 'Safety Alerts', value: '0', icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Open Positions', value: '12', icon: UserPlus, color: 'text-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, role, or site..." 
              className="w-full bg-secondary/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/2 border border-white/5 rounded-2xl hover:border-primary/20 transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 border-2 border-white/5 p-1 mb-4 group-hover:border-primary/50 transition-all relative">
                   <div className="h-full w-full rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <button 
                    onClick={() => handlePayslip(member)}
                    className="absolute -bottom-1 -right-1 p-2 bg-primary text-secondary rounded-full shadow-lg scale-0 group-hover:scale-100 transition-all duration-300"
                    title="Generate Payslip"
                   >
                    <Download size={12} />
                   </button>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">{member.role}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`h-2 w-2 rounded-full ${member.status === 'On-Site' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{member.status}</span>
                </div>

                <div className="w-full space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 uppercase tracking-tighter">Assigned Site:</span>
                    <span className="font-medium">{member.site}</span>
                  </div>
                  <div className="flex justify-center gap-3 mt-4">
                    <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffList;
