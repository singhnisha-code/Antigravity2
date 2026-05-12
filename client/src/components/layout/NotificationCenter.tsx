import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { notificationService, Notification } from '../../services/notificationService';
import { useAuth } from '../../hooks/useAuth';

const NotificationCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (user) {
      const unsubscribe = notificationService.subscribeNotifications(user.uid, (data) => {
        setNotifications(data);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleMarkRead = (id: string) => {
    notificationService.markAsRead(id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'error': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Info className="text-blue-500" size={16} />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-primary text-secondary text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-secondary animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 bg-secondary border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                <h3 className="font-bold text-sm">Notifications</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-all">
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <Bell className="mx-auto mb-2 opacity-20" size={32} />
                    <p className="text-xs uppercase tracking-widest font-bold">No new alerts</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => n.id && handleMarkRead(n.id)}
                      className={`p-4 border-b border-white/5 hover:bg-white/2 transition-all cursor-pointer flex gap-3 ${!n.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="mt-1">{getIcon(n.type)}</div>
                      <div className="flex-1">
                        <p className={`text-xs font-bold mb-0.5 ${!n.read ? 'text-primary' : 'text-slate-300'}`}>{n.title}</p>
                        <p className="text-[10px] text-slate-500 leading-tight">{n.message}</p>
                        <p className="text-[8px] text-slate-600 uppercase tracking-tighter mt-1">2 mins ago</p>
                      </div>
                      {!n.read && <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>}
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <button className="w-full p-3 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-primary hover:bg-white/2 transition-all border-t border-white/5">
                  View All Notifications
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
