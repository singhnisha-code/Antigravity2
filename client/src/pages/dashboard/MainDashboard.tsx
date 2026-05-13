import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  FileText, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  Search,
  Box,
  TrendingUp,
  Clock,
  IndianRupee,
  MessageSquare,
  Shield
} from 'lucide-react';


import { Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import NotificationCenter from '../../components/layout/NotificationCenter';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase/config';

// Dashboard Components
import ProjectList from './ProjectList';
import TenderList from './TenderList';
import StaffList from './StaffList';
import AttendanceView from './AttendanceView';
import InventoryList from './InventoryList';
import FinancialsView from './FinancialsView';
import SettingsView from './SettingsView';
import Overview from './Overview';
import ReviewManagement from './ReviewManagement';
import { userService } from '../../services/userService';



const SidebarItem = ({ icon: Icon, label, path, active, onClick }: any) => (
  <Link to={path} onClick={onClick}>
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-primary text-secondary font-bold shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  </Link>
);

const MainDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { profile } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', roles: ['admin', 'manager', 'user', 'client'] },
    { icon: Briefcase, label: 'Projects', path: '/dashboard/projects', roles: ['admin', 'manager', 'user', 'client'] },
    { icon: FileText, label: 'Tenders', path: '/dashboard/tenders', roles: ['admin', 'manager'] },
    { icon: Box, label: 'Inventory', path: '/dashboard/inventory', roles: ['admin', 'manager'] },
    { icon: Users, label: 'Staff & HR', path: '/dashboard/staff', roles: ['admin', 'manager'] },
    { icon: Clock, label: 'Attendance', path: '/dashboard/attendance', roles: ['admin', 'manager', 'user'] },
    { icon: IndianRupee, label: 'Financials', path: '/dashboard/financials', roles: ['admin'] },
    { icon: MessageSquare, label: 'Reviews', path: '/dashboard/reviews', roles: ['admin'] },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', roles: ['admin'] },
  ];


  const filteredItems = menuItems.filter(item => 
    !profile || item.roles.includes(profile.role)
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-charcoal overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-72 bg-secondary border-r border-white/5 flex flex-col z-40"
          >
            <div className="p-8 flex items-center gap-3">
              <img src={logo} alt="Rudra" className="h-10 w-10 rounded-lg" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient leading-none">RUDRA</span>
                <span className="text-[10px] text-slate-500 tracking-widest uppercase">Construction</span>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-4 ml-4">Main Menu</div>
              {filteredItems.map((item) => (
                <SidebarItem 
                  key={item.path} 
                  {...item} 
                  active={location.pathname === item.path}
                />
              ))}
            </nav>

            <div className="p-6 border-t border-white/5">

              {profile?.role !== 'admin' && (
                <button 
                  onClick={async () => {
                    if (profile?.email && profile?.displayName) {
                      const ok = await userService.requestAdminAccess(profile.email, profile.displayName);
                      if (ok) alert("Request sent to admins!");
                    }
                  }}
                  className="w-full mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all text-xs font-bold uppercase tracking-widest border border-primary/20"
                >
                  <Shield size={16} />
                  Seek Admin Permission
                </button>
              )}
              <div className="glass-card p-4 rounded-xl flex items-center gap-3 mb-4">

                <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                  {profile?.displayName?.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold truncate">{profile?.displayName || 'User'}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{profile?.role || 'Member'}</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-secondary/30 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-400"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live System
            </div>
            <NotificationCenter />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tenders" element={<TenderList />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/staff" element={<StaffList />} />
            <Route path="/attendance" element={<AttendanceView />} />
            <Route path="/financials" element={<FinancialsView />} />
            <Route path="/reviews" element={<ReviewManagement />} />
            <Route path="/settings" element={<SettingsView />} />

          </Routes>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
