
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { X, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const AuthModals: React.FC = () => {
  const { isLoginOpen, isRegisterOpen, closeModals, login, register, openRegister, openLogin } = useAuth();

  if (!isLoginOpen && !isRegisterOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeModals}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#0F1218] border border-brand-gold/30 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl"></div>
        
        {/* Close Button */}
        <button 
            onClick={closeModals}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
        >
            <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 p-8">
            {isLoginOpen ? (
                <LoginForm switchToRegister={openRegister} onSubmit={login} onClose={closeModals} />
            ) : (
                <RegisterForm switchToLogin={openLogin} onSubmit={register} onClose={closeModals} />
            )}
        </div>
      </div>
    </div>
  );
};

const LoginForm: React.FC<{ 
    switchToRegister: () => void; 
    onSubmit: (e: string, p: string) => Promise<boolean>;
    onClose: () => void;
}> = ({ switchToRegister, onSubmit, onClose }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await onSubmit(email, pass);
        if (success) {
            onClose();
        } else {
            setError('Invalid email or password.');
            setLoading(false);
        }
    };

    return (
        <div className="animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm mb-8">Enter your credentials to access the VIP lounge.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 outline-none transition-all"
                            placeholder="vip@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                            type="password" 
                            required
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <div className="text-right">
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Forgot Password?</a>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-brand-gold to-[#b8860b] text-black font-bold font-display uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-5 h-5" /></>}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
                Not a member? <button onClick={switchToRegister} className="text-brand-gold hover:underline font-bold">Join the Elite</button>
            </div>
        </div>
    );
};

const RegisterForm: React.FC<{ 
    switchToLogin: () => void; 
    onSubmit: (e: string, p: string, u: string) => Promise<boolean>;
    onClose: () => void;
}> = ({ switchToLogin, onSubmit, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (pass.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        const success = await onSubmit(email, pass, username);
        if (success) {
            onClose();
        } else {
            setError('Email already registered.');
            setLoading(false);
        }
    };

    return (
        <div className="animate-in slide-in-from-left-4 duration-300">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm mb-6">Claim your <span className="text-brand-gold font-bold">₱888 Welcome Bonus</span> upon registration.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Username</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                            type="text" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 outline-none transition-all"
                            placeholder="KingPlayer777"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 outline-none transition-all"
                            placeholder="vip@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                            type="password" 
                            required
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 outline-none transition-all"
                            placeholder="Create a secure password"
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-white text-black font-bold font-display uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Now"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
                Already a member? <button onClick={switchToLogin} className="text-brand-gold hover:underline font-bold">Login Here</button>
            </div>
        </div>
    );
};
