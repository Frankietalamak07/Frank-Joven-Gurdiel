
import React, { useState, useEffect } from 'react';
import { Menu, X, Download, User, ChevronDown, LogOut, Wallet } from 'lucide-react';
import { Button } from './Button';
import { Tg777Logo } from './Tg777Logo';
import { useAuth } from './AuthContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openLogin, openRegister, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Slots', href: '#slots' },
    { name: 'Live Casino', href: '#live-casino' },
    { name: 'Fishing', href: '#fishing' },
    { name: 'Card Games', href: '#cards' },
    { name: 'Cockfighting', href: '#sabong', highlight: true },
    { name: 'Sports', href: '#sports' },
    { name: 'Promotions', href: '#promotion' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-brand-dark/90 backdrop-blur-xl border-brand-gold/20 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Custom 3D Logo */}
          <a href="#" className="hover:scale-105 transition-transform duration-300">
            <Tg777Logo className="h-10 md:h-12 scale-110" />
          </a>

          {/* Desktop Navigation - Elegant Style */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`px-3 py-2 text-sm font-bold font-display uppercase tracking-widest transition-all duration-300 relative group ${
                    link.highlight 
                    ? 'text-brand-gold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${link.highlight ? 'scale-x-100 opacity-50' : ''}`}></span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex text-xs !py-2 gap-2 font-display" href="#download">
              <Download className="w-4 h-4" /> App
            </Button>

            {user ? (
                /* Logged In User Profile */
                <div className="relative">
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 bg-brand-card border border-white/10 rounded-full px-4 py-1.5 hover:border-brand-gold/50 transition-all"
                    >
                        <div className="text-right hidden md:block">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Balance</div>
                            <div className="text-sm font-mono text-brand-gold font-bold">₱{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-gold to-white flex items-center justify-center text-black font-bold shadow-lg">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-4 w-64 bg-brand-card border border-brand-gold/20 rounded-xl shadow-2xl p-2 animate-in slide-in-from-top-2 backdrop-blur-xl">
                            <div className="px-4 py-3 border-b border-white/5 mb-2">
                                <div className="font-bold text-white">{user.username}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                <User className="w-4 h-4" /> Profile
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors font-bold">
                                <Wallet className="w-4 h-4" /> Deposit
                            </button>
                            <button 
                                onClick={() => { logout(); setIsProfileOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mt-2"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                /* Guest Buttons */
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        onClick={openLogin} 
                        className="!py-2 !px-4 text-sm font-display font-bold text-white hover:text-brand-gold"
                    >
                       Login
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={openRegister} 
                        className="!py-2 !px-6 text-sm font-display shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    >
                       Sign Up
                    </Button>
                </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-gold p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-brand-gold/20 animate-in slide-in-from-top-5 h-screen z-50">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {user && (
                <div className="p-4 bg-white/5 rounded-xl mb-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold text-lg">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                             <div className="font-bold text-white">{user.username}</div>
                             <div className="text-brand-gold font-mono text-sm">₱{user.balance.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <button className="bg-brand-gold text-black font-bold py-2 rounded-lg text-xs uppercase">Deposit</button>
                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="bg-white/10 text-white font-bold py-2 rounded-lg text-xs uppercase">Logout</button>
                    </div>
                </div>
            )}

            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block px-4 py-4 text-xl font-display font-bold text-gray-300 hover:text-brand-gold hover:bg-white/5 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <a 
                href="#download" 
                className="block px-4 py-4 text-xl font-display font-bold text-brand-gold border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download App
              </a>
             {!user && (
                 <div className="p-4 grid grid-cols-2 gap-4 mt-4">
                    <button 
                        onClick={() => { openLogin(); setIsMobileMenuOpen(false); }}
                        className="bg-white/10 text-white font-bold py-4 rounded-xl border border-white/20"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => { openRegister(); setIsMobileMenuOpen(false); }}
                        className="bg-brand-gold text-black font-bold py-4 rounded-xl shadow-lg"
                    >
                        Sign Up
                    </button>
                 </div>
             )}
          </div>
        </div>
      )}
    </header>
  );
};
