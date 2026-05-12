import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, MapPin, Clock, CheckCircle, Search, Filter } from 'lucide-react';

const AttendanceView = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Smart Attendance</h2>
          <p className="text-slate-500 text-sm">Real-time site check-ins and overtime tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 glass rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-all font-bold">
            <QrCode size={18} />
            Generate Site QR
          </button>
          <button className="btn-gold flex items-center gap-2">
            <Clock size={18} />
            Manual Check-in
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Attendance Summary */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold">Live Site Status</h3>
              <div className="flex gap-2">
                 <button className="p-2 bg-white/5 rounded-lg text-slate-400"><Search size={16} /></button>
                 <button className="p-2 bg-white/5 rounded-lg text-slate-400"><Filter size={16} /></button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { site: 'Rudra Heights', total: 42, present: 38, lateness: '5%', status: 'Active' },
                { site: 'Skyline Bridge', total: 28, present: 26, lateness: '2%', status: 'Active' },
                { site: 'NH-44 Highway', total: 86, present: 74, lateness: '12%', status: 'Delayed' },
              ].map((site, i) => (
                <div key={i} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{site.site}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">GPS Verified</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-500">{site.present} / {site.total}</div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-red-400">{site.lateness}</div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Avg Delay</div>
                    </div>
                    <div className="hidden md:block">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${site.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                        {site.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 className="font-bold mb-6">Recent Check-ins</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">SK</div>
                    <div>
                      <span className="font-bold">Suresh Kumar</span>
                      <span className="text-slate-500 text-xs ml-2">Clocked In at 08:32 AM</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle size={14} />
                    <span className="text-[10px] font-bold uppercase">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QR Scan Simulation / Visual */}
        <div className="space-y-6">
          <div className="glass-card bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-center p-4">
              <div className="mx-auto w-40 h-40 bg-white p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(200,155,60,0.3)]">
                 <div className="w-full h-full border-4 border-secondary flex items-center justify-center">
                    <QrCode size={80} className="text-secondary" />
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gradient">Site Entry Pass</h3>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">Scanner ID: RUDRA-HQ-01</p>
            </div>
          </div>

          <div className="glass-card">
             <h3 className="font-bold mb-4">Location Verification</h3>
             <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/72.8777,19.0760,12,0/400x400?access_token=placeholder')] bg-cover opacity-30 grayscale"></div>
                <div className="relative z-10 flex flex-col items-center">
                   <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
                      <MapPin size={24} className="text-primary" />
                   </div>
                   <div className="mt-4 px-4 py-2 glass rounded-full text-[10px] font-bold text-primary border-primary/30">
                      Mumbai HQ (Verified)
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
