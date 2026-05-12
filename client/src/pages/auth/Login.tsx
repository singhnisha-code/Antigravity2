import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Rudra Construction" className="h-16 w-16 mx-auto mb-4 rounded-xl shadow-2xl" />
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Access your Rudra Construction ERP dashboard</p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input type="checkbox" className="rounded border-white/10 bg-secondary" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full btn-gold py-3 flex items-center justify-center gap-2 font-bold text-lg">
              Sign In <LogIn size={20} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">
              New to the platform? <button onClick={() => navigate('/')} className="text-primary font-semibold hover:underline">Register your firm</button>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="text-[10px] uppercase tracking-tighter font-bold">Secure Access</div>
          <div className="text-[10px] uppercase tracking-tighter font-bold">256-bit Encryption</div>
          <div className="text-[10px] uppercase tracking-tighter font-bold">Enterprise Grade</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
