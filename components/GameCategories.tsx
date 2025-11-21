
import React from 'react';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

const LEFT_CATEGORIES = [
  {
    id: 'slots',
    title: 'SLOTS',
    desc: 'Spin & Win',
    image: 'https://playtg777.games/assets/providers/slots.png',
    link: '#slots',
    color: 'text-purple-400'
  },
  {
    id: 'sports',
    title: 'SPORTS',
    desc: 'Live Betting',
    image: 'https://playtg777.games/assets/providers/sports.png',
    link: '#sports',
    color: 'text-blue-400'
  },
  {
    id: 'sabong',
    title: 'SABONG',
    desc: 'Arena Battles',
    image: 'https://playtg777.games/assets/providers/sabong.png',
    link: '#sabong',
    color: 'text-red-400'
  },
  {
    id: 'fishing',
    title: 'FISHING',
    desc: 'Ocean Hunt',
    image: 'https://playtg777.games/assets/providers/fishing.png',
    link: '#fishing',
    color: 'text-cyan-400'
  },
  {
    id: 'cards',
    title: 'TABLE GAMES',
    desc: 'Poker & Strategy',
    image: 'https://kingtg777.com/wp-content/uploads/2025/07/luckybaccarat-banner.png',
    link: '#cards',
    color: 'text-green-400'
  }
];

const FEATURED_CATEGORY = {
    id: 'live',
    title: 'LIVE CASINO',
    subtitle: 'PREMIUM REAL-TIME DEALERS',
    desc: 'Experience the thrill of Las Vegas from your home.',
    image: 'https://playtg777.games/assets/providers/live.png',
    link: '#live-casino',
};

export const GameCategories: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark relative z-20 border-b border-white/5 overflow-hidden">
      
      {/* Inject Custom Keyframes for Wiggle & Bounce Animation */}
      <style>
        {`
          @keyframes wiggle-bounce {
            0%, 100% { transform: rotate(-2deg) translateY(0); }
            50% { transform: rotate(2deg) translateY(-6px); }
          }
          .hover-wiggle-bounce:hover {
            animation: wiggle-bounce 0.6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-widest mb-4">
             Game <span className="text-gold-gradient">Categories</span>
           </h2>
           <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Choose your path to victory</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT SIDE: 5 Cards Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {LEFT_CATEGORIES.map((cat, index) => (
                    <div 
                        key={cat.id} 
                        onClick={() => window.location.href = cat.link}
                        className={`relative group rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer bg-brand-card hover:border-brand-gold/50 transition-all duration-300 hover-wiggle-bounce h-64 ${index === 4 ? 'md:col-span-2' : ''}`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-black">
                            <img 
                                src={cat.image} 
                                alt={cat.title}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                            />
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        {/* Highlight Shine */}
                        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                             <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <Sparkles className={`w-4 h-4 ${cat.color}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${cat.color}`}>{cat.desc}</span>
                             </div>
                             <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight group-hover:text-brand-gold transition-colors">
                                {cat.title}
                             </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT SIDE: Featured Big Card (3D Side View) */}
            <div className="w-full lg:w-5/12 h-[500px] lg:h-auto">
                 <div 
                    className="relative w-full h-full group rounded-3xl overflow-hidden border border-brand-gold/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:[transform:perspective(1500px)_rotateY(-15deg)_scale(0.95)] hover:lg:[transform:perspective(1500px)_rotateY(0deg)_scale(1)] hover:z-10 hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] bg-brand-dark min-h-[500px]"
                    onClick={() => window.location.href = FEATURED_CATEGORY.link}
                 >
                      {/* Background */}
                      <div className="absolute inset-0 bg-black">
                          <img 
                            src={FEATURED_CATEGORY.image} 
                            alt={FEATURED_CATEGORY.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                          />
                      </div>
                      
                      {/* Overlay Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-brand-dark/90 group-hover:opacity-80 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-center text-center z-20 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold text-black mb-6 shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform duration-300 animate-pulse">
                                <Play className="w-6 h-6 fill-current ml-1" />
                           </div>
                           
                           <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-xs font-mono text-brand-gold uppercase tracking-widest mb-4">
                                {FEATURED_CATEGORY.subtitle}
                           </div>

                           <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl leading-none">
                                {FEATURED_CATEGORY.title}
                           </h3>
                           
                           <p className="text-lg text-gray-300 font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {FEATURED_CATEGORY.desc}
                           </p>

                           <div className="mt-8 flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group-hover:text-brand-gold transition-colors">
                                Enter Lobby <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                           </div>
                      </div>

                      {/* Border Glow Animation */}
                      <div className="absolute inset-0 border-2 border-brand-gold/0 group-hover:border-brand-gold/50 rounded-3xl transition-all duration-500"></div>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};
