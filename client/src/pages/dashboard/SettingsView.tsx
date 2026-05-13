import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Palette, Bell, History, Activity } from 'lucide-react';
import { auditService, AuditLog } from '../../services/auditService';
import { userService, UserProfile } from '../../services/userService';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (activeTab === 'audit') {
      const unsubscribe = auditService.subscribeLogs((data) => {
        setLogs(data);
      });
      return () => unsubscribe();
    }
    if (activeTab === 'roles') {
      const unsubscribe = userService.subscribeUsers((data) => {
        setUsers(data);
      });
      return () => unsubscribe();
    }
  }, [activeTab]);


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-slate-500 text-sm">Configure ERP modules, branding, and access controls</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar for Settings */}
        <div className="space-y-2">
          {[
            { id: 'branding', label: 'Branding & CMS', icon: Palette },
            { id: 'audit', label: 'Audit Logs', icon: History },
            { id: 'roles', label: 'User Roles & Permissions', icon: Shield },
            { id: 'notifications', label: 'Notification Settings', icon: Bell },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-primary text-secondary font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content for Settings */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === 'branding' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-card">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Palette size={20} className="text-primary" />
                  Enterprise Branding
                </h3>
                <div className="flex items-center gap-6 p-4 bg-white/2 border border-white/5 rounded-xl">
                  <div className="h-20 w-20 bg-secondary rounded-lg border border-white/10 flex items-center justify-center">
                     <span className="text-[10px] text-slate-500 uppercase font-bold text-center">LOGO<br/>PREVIEW</span>
                  </div>
                  <div className="flex-1">
                     <p className="text-sm font-bold mb-1">Company Logo</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Recommended: 512x512 Transparent PNG</p>
                     <button className="px-4 py-2 glass rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Replace Logo</button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Color</label>
                     <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-lg bg-primary border border-white/10"></div>
                        <input type="text" value="#C89B3C" className="flex-1 bg-secondary/50 border border-white/10 rounded-lg px-3 text-xs font-mono text-white focus:outline-none" readOnly />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secondary Color</label>
                     <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-lg bg-secondary border border-white/10"></div>
                        <input type="text" value="#0F172A" className="flex-1 bg-secondary/50 border border-white/10 rounded-lg px-3 text-xs font-mono text-white focus:outline-none" readOnly />
                     </div>
                  </div>
               </div>
              </div>

              <div className="glass-card">
                 <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Globe size={20} className="text-primary" />
                    Landing Page CMS
                 </h3>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Hero Headline</label>
                       <textarea 
                        className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all h-24"
                        defaultValue="Building the Future of Enterprise Infrastructure"
                       ></textarea>
                    </div>
                    <div className="pt-4">
                       <button className="btn-gold w-full font-bold uppercase tracking-widest text-xs py-3">Save CMS Changes</button>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'roles' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-card">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-primary" />
                  User Roles & Permissions
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Manage administrative access. Only designated super-admins can approve new admin requests.
                </p>
                
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm italic">Loading users...</div>
                  ) : (
                    users.map((u) => (
                      <div key={u.uid} className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-secondary border border-white/10 flex items-center justify-center font-bold text-xs">
                            {u.displayName?.charAt(0) || u.email.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{u.displayName || 'Anonymous User'}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{u.email}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${u.adminApproved ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-slate-500/10 text-slate-400 border-white/5'}`}>
                            {u.adminApproved ? 'Admin' : 'User'}
                          </span>
                          
                          {u.email !== 'singhmanohar6699@gmail.com' && u.email !== 'nisxsingh6356@gmail.com' && (
                            <button 
                              onClick={() => u.adminApproved ? userService.revokeAdmin(u.uid) : userService.approveAdmin(u.uid)}
                              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${u.adminApproved ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-primary text-secondary hover:scale-105'}`}
                            >
                              {u.adminApproved ? 'Revoke' : 'Approve Admin'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'audit' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-card !p-0 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                  <h3 className="font-bold flex items-center gap-2">
                    <Activity size={18} className="text-primary" />
                    Security Audit Logs
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Live Feed</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/1 text-[10px] uppercase tracking-widest font-bold text-slate-500 border-b border-white/5">
                        <th className="p-4">Timestamp</th>
                        <th className="p-4">User</th>
                        <th className="p-4">Action</th>
                        <th className="p-4">Module</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-12 text-center text-slate-500 text-xs font-mono">
                            NO AUDIT DATA AVAILABLE: SYSTEM_IDLE
                          </td>
                        </tr>
                      ) : (
                        logs.map((log) => (
                          <tr key={log.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                            <td className="p-4 text-xs font-mono text-slate-400">{new Date(log.createdAt).toLocaleTimeString()}</td>
                            <td className="p-4 flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[8px] font-bold">
                                {log.userName.charAt(0)}
                              </div>
                              <span className="text-xs font-bold">{log.userName}</span>
                            </td>
                            <td className="p-4 text-xs text-slate-300">{log.action}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold uppercase text-slate-500">{log.module}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}


        </div>
      </div>
    </div>
  );
};

export default SettingsView;
