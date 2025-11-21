
import React from 'react';

const PROVIDERS = [
    // Top Tier / Popular
    { id: 'jili', name: 'JILI Gaming', code: 'JILI' },
    { id: 'pg', name: 'PG Soft', code: 'PG' },
    { id: 'fc', name: 'Fa Chai', code: 'FC' },
    { id: 'jdb', name: 'JDB Gaming', code: 'JDB' },
    { id: 'pp', name: 'Pragmatic Play', code: 'PP' },
    { id: 'evo', name: 'Evolution', code: 'EVO' },
    { id: 'cq9', name: 'CQ9 Gaming', code: 'CQ9' },
    { id: 'ka', name: 'KA Gaming', code: 'KA' },
    
    // Global Giants
    { id: 'png', name: "Play'n GO", code: 'PNG' },
    { id: 'netent', name: 'NetEnt', code: 'NET' },
    { id: 'mg', name: 'Microgaming', code: 'MG' },
    { id: 'pt', name: 'Playtech', code: 'PT' },
    { id: 'hab', name: 'Habanero', code: 'HAB' },
    { id: 'spade', name: 'Spadegaming', code: 'SG' },
    { id: 'red', name: 'Red Tiger', code: 'RED' },
    { id: 'btg', name: 'Big Time Gaming', code: 'BTG' },

    // Innovators
    { id: 'hacksaw', name: 'Hacksaw Gaming', code: 'HACK' },
    { id: 'nolimit', name: 'Nolimit City', code: 'NLC' },
    { id: 'relax', name: 'Relax Gaming', code: 'RLX' },
    { id: 'ygg', name: 'Yggdrasil', code: 'YGG' },
    { id: 'bp', name: 'Blueprint', code: 'BP' },
    { id: 'push', name: 'Push Gaming', code: 'PUSH' },
    { id: 'elk', name: 'ELK Studios', code: 'ELK' },
    { id: 'tk', name: 'Thunderkick', code: 'TK' },

    // Live & Specialty
    { id: 'ezu', name: 'Ezugi', code: 'EZU' },
    { id: 'ae', name: 'AE Sexy', code: 'AE' },
    { id: 'dg', name: 'Dream Gaming', code: 'DG' },
    { id: 'sa', name: 'SA Gaming', code: 'SA' },
    { id: 'ag', name: 'Asia Gaming', code: 'AG' },
    { id: 'wm', name: 'WorldMatch', code: 'WM' },
    { id: 'ps', name: 'Playson', code: 'PS' },
    { id: 'end', name: 'Endorphina', code: 'END' },
];

export const GameProviders: React.FC = () => {
  return (
    <section className="py-16 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
             <p className="text-brand-gold/60 font-display font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">
                Trusted by Industry Leaders
             </p>
             <h3 className="text-2xl md:text-4xl font-display font-bold text-white">
                Official <span className="text-gold-gradient">Game Partners</span>
             </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {PROVIDERS.map((provider, idx) => (
                <div 
                    key={provider.id}
                    className="group relative aspect-[3/2] bg-brand-card border border-white/5 rounded-lg flex items-center justify-center hover:border-brand-gold/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-20">
                        <div className="bg-black/90 text-brand-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-xl whitespace-nowrap border border-brand-gold/20">
                            {provider.name}
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-brand-gold/20"></div>
                    </div>

                    {/* Logo Representation (Stylized Text as fallback) */}
                    <div className="text-xl md:text-2xl font-display font-black text-gray-500 group-hover:text-white group-hover:text-shadow-gold transition-all duration-300">
                        {provider.code}
                    </div>
                    
                    {/* Glow */}
                    <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
