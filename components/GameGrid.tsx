
import React, { useEffect, useRef, useState } from 'react';
import { Play, Star, Flame } from 'lucide-react';
import { useAuth } from './AuthContext';
import { SlotGameModal } from './SlotGameModal';

const games = [
  {
    id: 'superace',
    title: 'Super Ace',
    provider: 'JILI',
    img: 'https://placehold.co/400x400/1A1D24/BF953F.png?text=Super+Ace',
    rtp: '98.0%',
    hot: true
  },
  {
    id: 'crazy777',
    title: 'Crazy 777',
    provider: 'JILI',
    img: 'https://kingtg777.com/wp-content/uploads/2025/06/Crazy777-Logo.png',
    rtp: '98.5%',
    hot: true
  },
  {
    id: 'bravo777',
    title: 'Bravo 777',
    provider: 'JILI',
    img: 'https://kingtg777.com/wp-content/uploads/2025/06/Bravo777-Logo.png',
    rtp: '97.2%',
    hot: false
  },
  {
    id: 'lucky777',
    title: 'Lucky 777',
    provider: 'PG SOFT',
    img: 'https://kingtg777.com/wp-content/uploads/2025/06/Lucky777-Logo.png',
    rtp: '99.1%',
    hot: true
  },
  {
    id: 'fire777',
    title: 'Fire 777',
    provider: 'FC',
    img: 'https://kingtg777.com/wp-content/uploads/2025/06/Fire777-Logo.png',
    rtp: '96.8%',
    hot: false
  }
];

export const GameGrid: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { user, openLogin } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handlePlay = (gameId: string) => {
      if (user) {
          setActiveGame(gameId);
      } else {
          openLogin();
      }
  };

  return (
    <section ref={sectionRef} id="slots" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
            <div>
                <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs mb-2">
                    <Flame className="w-4 h-4" /> Trending Now
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    FEATURED <span className="text-gold-gradient">SLOTS</span>
                </h2>
            </div>
            <a href="#" className="hidden md:block text-brand-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border-b border-brand-gold pb-1">
                View All Games
            </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {games.map((game, index) => (
            <div 
              key={game.id} 
              className={`group relative bg-brand-card rounded-xl border border-white/5 hover:border-brand-gold/50 transition-all duration-700 ease-out transform hover:z-50
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Hover Tooltip */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-black/90 backdrop-blur-md border border-brand-gold/30 text-white px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.8)] whitespace-nowrap relative min-w-[120px] text-center">
                    <div className="font-display font-bold text-sm text-white">{game.title}</div>
                    <div className="text-brand-gold text-[10px] font-mono uppercase tracking-wider">{game.provider}</div>
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 border-b border-r border-brand-gold/30 rotate-45"></div>
                </div>
              </div>

              {/* Content Wrapper - Handles Overflow Clipping for Zoom */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                  {/* Hot Badge */}
                  {game.hot && (
                    <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg shadow-lg">
                       HOT
                    </div>
                  )}

                  {/* RTP Badge */}
                  <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-md text-brand-gold border border-brand-gold/20 text-[10px] font-mono px-2 py-1 rounded">
                     RTP {game.rtp}
                  </div>
                  
                  {/* Image Container */}
                  <div className="aspect-[3/4] relative p-6 flex items-center justify-center bg-gradient-to-b from-brand-accent to-brand-card">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                    <img 
                      src={game.img} 
                      alt={game.title}
                      loading="lazy"
                      className="w-full h-auto object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 cursor-pointer" onClick={() => handlePlay(game.id)}>
                        <div className="relative flex items-center justify-center">
                            {/* Pulse Ring */}
                            <div className="absolute w-full h-full bg-brand-gold/30 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '2s' }}></div>
                            
                            {/* Play Button */}
                            <button className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-gold to-[#d4af37] text-black flex items-center justify-center transform scale-50 group-hover:scale-100 hover:!scale-110 transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275) shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                                <Play className="w-6 h-6 fill-current ml-1" />
                            </button>
                        </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 border-t border-white/5 bg-brand-card relative z-10">
                    <h3 className="text-white font-bold text-sm truncate font-display">{game.title}</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{game.provider}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Actual Game Modal */}
      {activeGame && (
          <SlotGameModal 
            gameTitle={games.find(g => g.id === activeGame)?.title || 'Slot Game'} 
            onClose={() => setActiveGame(null)} 
          />
      )}
    </section>
  );
};
