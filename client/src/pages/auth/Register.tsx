import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ChevronRight, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { authService } from '../../services/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In this specific OTP implementation, registration is basically the same as login.
      // We send an OTP, and if they verify it, the useAuth hook creates their profile.
      await authService.sendEmailOTP(email);
      setSuccess(true);
      // Redirect to login with the email pre-filled
      setTimeout(() => {
        navigate('/login', { state: { email } });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Rudra Construction" className="h-16 w-16 mx-auto mb-4 rounded-xl shadow-2xl border border-white/10" />
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-slate-400 text-sm">Join the Rudra Construction Ecosystem</p>
        </div>

        <div className="glass-card !p-8 shadow-2xl border border-white/5">
          {success ? (
            <div className="text-center py-6">
              <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
              <p className="text-slate-400 text-sm">We've sent a verification OTP to {email}. Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-secondary border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Corporate Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-secondary border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-gold py-4 flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02]"
              >
                {loading ? 'Processing...' : 'Create Account'}
                <ChevronRight size={18} />
              </button>

              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <ArrowLeft size={14} /> Already have an account? Login
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
