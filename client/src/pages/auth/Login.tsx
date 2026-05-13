import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, LogIn, ChevronRight, Shield, Smartphone } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { authService } from '../../services/authService';

const Login = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (method === 'phone') {
      authService.setupRecaptcha('recaptcha-container');
    }
  }, [method]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (method === 'email') {
        await authService.sendEmailOTP(identifier);
      } else {
        const result = await authService.sendPhoneOTP(identifier);
        setConfirmationResult(result);
      }
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (method === 'email') {
        await authService.verifyEmailOTP(identifier, otp);
        // For custom email OTP, we need a way to tell the app we're logged in.
        // In this implementation, we'll navigate and assume state is handled.
        navigate('/dashboard');
      } else {
        await authService.verifyPhoneOTP(confirmationResult, otp);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authService.signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Rudra Construction" className="h-20 w-20 mx-auto mb-4 rounded-2xl shadow-2xl border border-white/10" />
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Rudra Enterprise</h1>
          <p className="text-slate-400 text-sm">Secure Portal for Construction Management</p>
        </div>

        <div className="glass-card !p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
          {/* Method Selector */}
          {step === 'request' && (
            <div className="flex p-1 bg-secondary/50 rounded-xl mb-8 border border-white/5">
              <button 
                onClick={() => setMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${method === 'email' ? 'bg-primary text-secondary' : 'text-slate-400 hover:text-white'}`}
              >
                <Mail size={14} /> Email
              </button>
              <button 
                onClick={() => setMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${method === 'phone' ? 'bg-primary text-secondary' : 'text-slate-400 hover:text-white'}`}
              >
                <Phone size={14} /> Phone
              </button>
            </div>
          )}

          <form onSubmit={step === 'request' ? handleSendOTP : handleVerifyOTP} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 'request' ? (
                <motion.div 
                  key="request"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                      {method === 'email' ? 'Corporate Email' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      {method === 'email' ? (
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      ) : (
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      )}
                      <input 
                        type={method === 'email' ? 'email' : 'tel'} 
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={method === 'email' ? 'name@rudra.com' : '+91 99999 99999'}
                        className="w-full bg-secondary border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="verify"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">6-Digit OTP</label>
                      <button 
                        type="button" 
                        onClick={() => setStep('request')}
                        className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                      >
                        Change {method}
                      </button>
                    </div>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="0 0 0 0 0 0"
                        className="w-full bg-secondary border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all text-center text-2xl tracking-[0.5em] font-bold"
                        maxLength={6}
                        required
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 text-center mt-2 italic">
                      OTP sent to {identifier}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="text-red-500 text-xs bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                {error}
              </p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full btn-gold py-4 flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {step === 'request' ? 'Request Secure Access' : 'Verify & Enter Dashboard'}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          {step === 'request' && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-secondary/80 px-4 text-slate-500">Or continue with</span></div>
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl flex items-center justify-center gap-3 transition-all font-bold text-sm"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                Google Workspace
              </button>
            </>
          )}

          <div id="recaptcha-container"></div>
        </div>

        <div className="mt-8 pt-6 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2">
            <Shield size={12} className="text-primary" />
            Enterprise Security Policy Enforced
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

