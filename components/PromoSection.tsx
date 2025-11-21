
import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, Tag, ChevronRight, Loader2, ImageIcon } from 'lucide-react';

// Updated list of 17 promotional banners with descriptive alt text
const PROMOS = [
  { 
    id: 'promo-1', 
    alt: 'Exclusive welcome bonus for new TG777 players - Join now and claim rewards',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-1.jpg' 
  },
  { 
    id: 'promo-2', 
    alt: 'Daily slot rewards - Spin the reels and win prizes every day',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-2.jpg'
  },
  { 
    id: 'promo-3', 
    alt: 'High-stakes poker nights - Join the exclusive action at the tables',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-3.jpg'
  },
  { 
    id: 'promo-4', 
    alt: 'Weekend deposit bonus - Double your deposit promotion',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-4.jpg'
  },
  { 
    id: 'promo-5', 
    alt: 'TG777 VIP Club - Unlock elite benefits and exclusive perks',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-5.jpg'
  },
  { 
    id: 'promo-6', 
    alt: 'Referral Program - Refer friends to TG777 and earn unlimited rewards',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-6.jpg'
  },
  { 
    id: 'promo-7', 
    alt: 'Monday Cashback - Get money back on losses every Monday',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-7.jpg'
  },
  { 
    id: 'promo-8', 
    alt: 'Mega Jackpot Alert - Play featured slots to win big',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-8.jpg'
  },
  { 
    id: 'promo-9', 
    alt: 'Live Casino Thrills - Experience real-time dealers and interactive games',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-9.jpg'
  },
  { 
    id: 'promo-10', 
    alt: 'TG777 Mobile App Download - Play casino games anytime, anywhere',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-10.jpg'
  },
  { 
    id: 'promo-11', 
    alt: 'Flash Promotions - Limited time offers you cannot miss',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-11.jpg'
  },
  { 
    id: 'promo-12', 
    alt: 'Payment Methods - TG777 now accepts Maya and GCash QR payments',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-12.jpg'
  },
  { 
    id: 'promo-13', 
    alt: 'Fast Withdrawals - Secure and instant payout guarantee',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-13.jpg'
  },
  { 
    id: 'promo-14', 
    alt: 'Leaderboard Challenge - Climb the ranks and conquer the competition',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-14.jpg'
  },
  { 
    id: 'promo-15', 
    alt: 'Anniversary Bash - Massive giveaways and celebration events',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-15.jpg'
  },
  { 
    id: 'promo-16', 
    alt: 'Weekend Reload Bonus - Boost your bankroll every weekend',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-16.jpg'
  },
  { 
    id: 'promo-17', 
    alt: 'Exclusive Tournaments - Register now for TG777 competitions',
    img: 'https://playtg777.vip/assets/promo-banners/tg777-promo-17.jpg'
  }
];

const PromoCard: React.FC<{ promo: typeof PROMOS[0]; onClick: () => void }> = ({ promo, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="snap-center shrink-0 w-[300px] md:w-[380px] group cursor-pointer relative"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`View promotion: ${promo.alt}`}
    >
      <div className="relative aspect-[3/1.2] md:aspect-[3/1] rounded-xl overflow-hidden border border-white/10 group-hover:border-brand-gold/50 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-brand-card">
         
         {/* Loading Placeholder & Animation */}
         {isLoading && (
            <div className="absolute inset-0 bg-[#151921] animate-pulse flex items-center justify-center z-10">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <ImageIcon className="w-12 h-12 text-white" />
                </div>
                <Loader2 className="w-6 h-6 text-brand-gold/50 animate-spin relative z-10" />
            </div>
         )}

         {/* Image */}
         <img 
            src={promo.img}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/600x200/151921/BF953F?text=Promotion`;
                setIsLoading(false);
            }}
            onLoad={() => setIsLoading(false)}
            alt={promo.alt}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
         />
         
         {/* Shine Effect */}
         <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

         {/* Overlay Icon */}
         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
            <div className="w-12 h-12 rounded-full bg-brand-gold/90 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-300">
                <ZoomIn className="w-6 h-6 text-black" />
            </div>
        </div>
      </div>
    </div>
  );
};

const PromoModalImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    return (
        <div className="relative w-full h-full flex items-center justify-center min-h-[200px] bg-[#151921] rounded-lg">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                </div>
            )}
            <img 
                src={src}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/1200x400/151921/BF953F?text=Promotion`;
                    setIsLoading(false);
                }}
                onLoad={() => setIsLoading(false)}
                alt={alt}
                className={`w-full max-h-[80vh] object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
        </div>
    );
};

export const PromoSection: React.FC = () => {
  const [selectedPromo, setSelectedPromo] = useState<typeof PROMOS[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Handle body scroll lock and keyboard navigation (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPromo(null);
      }
    };

    if (selectedPromo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => { 
        document.body.style.overflow = 'unset'; 
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPromo]);

  // Auto-scroll carousel logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (isPaused || selectedPromo || !scrollRef.current) return;

      const container = scrollRef.current;
      // Get width of first card to determine scroll distance
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // gap-6 is 1.5rem = 24px
      const scrollAmount = cardWidth + gap;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // If we are near the end, scroll back to start
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, selectedPromo]);

  return (
    <section className="py-16 bg-brand-dark relative border-b border-white/5 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-gold/10 rounded-lg">
                    <Tag className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">
                        Exclusive <span className="text-gold-gradient">Promotions</span>
                    </h2>
                    <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Limited Time Offers</p>
                </div>
            </div>
            <a href="#promotion" className="hidden md:flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-widest hover:text-white transition-colors">
                View All <ChevronRight className="w-4 h-4" />
            </a>
        </div>

        {/* Horizontal Carousel */}
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pt-4 scroll-smooth touch-pan-x"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
          {PROMOS.map((promo) => (
             <PromoCard key={promo.id} promo={promo} onClick={() => setSelectedPromo(promo)} />
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedPromo && (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedPromo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPromo.alt}
        >
            {/* Close Button */}
            <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-brand-gold transition-colors z-50 transform hover:scale-110 hover:rotate-90 duration-300"
                onClick={(e) => { e.stopPropagation(); setSelectedPromo(null); }}
                aria-label="Close promotion modal"
            >
                <X className="w-10 h-10" />
            </button>

            {/* Modal Content */}
            <div 
                className="relative max-w-5xl w-full bg-brand-card rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.15)] border border-brand-gold/20 transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full bg-black flex justify-center items-center p-0 md:p-2 min-h-[300px]">
                     <PromoModalImage src={selectedPromo.img} alt={selectedPromo.alt} />
                </div>
            </div>
        </div>
      )}
    </section>
  );
};
