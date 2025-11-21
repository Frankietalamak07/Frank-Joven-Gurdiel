
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Play } from 'lucide-react';

const CATEGORIES = [
  {
    id: 0,
    title: "MASSIVE SLOTS",
    subtitle: "SPIN & WIN",
    desc: "Dive into a universe of over 1,000+ premium slot games. From classic fruit machines to modern 3D video slots with life-changing jackpots.",
    img: "https://kingtg777.com/wp-content/uploads/2025/07/sugar-rush100-pp-slots.png",
    color: "text-purple-400",
    bgGradient: "from-purple-900/20 to-brand-dark"
  },
  {
    id: 1,
    title: "LIVE CASINO",
    subtitle: "REAL THRILLS",
    desc: "Experience the authentic casino vibe with real-time dealers. Baccarat, Roulette, and Blackjack streamed in HD directly to your device.",
    img: "https://kingtg777.com/wp-content/uploads/2025/07/luckybaccarat-banner.png",
    color: "text-red-500",
    bgGradient: "from-red-900/20 to-brand-dark"
  },
  {
    id: 2,
    title: "SPORTS & ARENA",
    subtitle: "BOLD ACTION",
    desc: "Place your bets on the world's biggest sports events and exclusive Cockfighting (Sabong) streams. High odds and instant settlements.",
    img: "https://kingtg777.com/wp-content/uploads/2025/06/Perya-Games-Image.png",
    color: "text-brand-gold",
    bgGradient: "from-amber-900/20 to-brand-dark"
  }
];

export const CategoryGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle resize to ensure transforms are accurate
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // We want the animation to span the scroll duration
      const scrollDistance = -top;
      const maxScroll = height - windowHeight;
      
      if (maxScroll <= 0) return;

      const rawProgress = Math.max(0, Math.min(1, scrollDistance / maxScroll));
      
      // Use RAF for performance
      requestAnimationFrame(() => {
          setProgress(rawProgress);
          const newIndex = Math.min(2, Math.floor(rawProgress * 3));
          setActiveIndex(newIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Transformation Logic ---

  // 1. Header Transform
  // Desktop: Moves from center to top-left.
  // Mobile: Moves from center to top-center and fades out/scales down to avoid wheel overlap.
  const isMobile = windowWidth < 768;
  const headerProgress = Math.min(1, progress * 8); // Completes fast (first 12% of scroll)
  
  // Desktop Vals
  const dtScale = 1 - (headerProgress * 0.4); // 1 -> 0.6
  const dtX = headerProgress * -35; // 0 -> -35vw
  const dtY = headerProgress * -40; // 0 -> -40vh
  
  // Mobile Vals
  const mbScale = 1 - (headerProgress * 0.5); // 1 -> 0.5
  const mbY = headerProgress * -45; // Move up significantly
  
  const headerStyle = isMobile 
    ? { 
        transform: `translate(-50%, -50%) translateY(${mbY}vh) scale(${mbScale})`,
        opacity: 1 - headerProgress * 0.8 // Fade out on mobile to clear view
      }
    : { 
        transform: `translate(-50%, -50%) translate(${dtX}vw, ${dtY}vh) scale(${dtScale})` 
      };

  // 2. Wheel Rotation
  // Rotate based on active index + progress for fluid feel
  const rotation = -(progress * 240); 

  return (
    <section 
        ref={sectionRef} 
        id="categories" 
        className="relative h-[300vh] bg-brand-dark"
    >
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
            
            {/* Dynamic Backgrounds */}
            <div className="absolute inset-0 transition-colors duration-1000 ease-in-out pointer-events-none">
                 {CATEGORIES.map((cat, idx) => (
                     <div 
                        key={cat.id}
                        className={`absolute inset-0 bg-gradient-to-b ${cat.bgGradient} transition-opacity duration-1000 ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                     />
                 ))}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center justify-center">
                
                {/* 1. Animated Header */}
                <div 
                    className="absolute z-20 flex flex-col items-center md:items-start text-center md:text-left transition-transform duration-100 ease-out origin-center md:origin-top-left"
                    style={{
                        top: '45%',
                        left: '50%',
                        ...headerStyle
                    }}
                >
                    <h3 className="text-lg md:text-2xl font-bold text-brand-gold uppercase tracking-[0.5em] mb-2 opacity-80">
                        Explore The
                    </h3>
                    <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter drop-shadow-2xl whitespace-nowrap">
                        TG777 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">UNIVERSE</span>
                    </h2>
                </div>

                {/* 2. Rotating Wheel (Left Side) */}
                <div 
                    className={`relative w-[280px] h-[280px] md:w-[600px] md:h-[600px] flex-shrink-0 transition-opacity duration-500 ${progress > 0.05 ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* The Wheel Container */}
                    <div 
                        className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 transition-transform duration-700 ease-out-quart"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                         {CATEGORIES.map((cat, idx) => {
                             const angle = idx * 120;
                             return (
                                 <div 
                                    key={cat.id}
                                    className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 -ml-16 -mt-16 md:-ml-32 md:-mt-32 transition-all duration-500"
                                    style={{ 
                                        transform: `rotate(${angle}deg) translate(0, -140%) rotate(${-angle}deg)`, // Push out radially
                                    }}
                                 >
                                     <div className={`relative w-full h-full rounded-full overflow-hidden border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 ${activeIndex === idx ? 'border-brand-gold scale-110 grayscale-0' : 'border-white/10 scale-90 grayscale opacity-50'}`}>
                                         <img 
                                            src={cat.img} 
                                            alt={cat.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                         />
                                         {/* Overlay Glow for Active */}
                                         <div className={`absolute inset-0 bg-brand-gold/20 mix-blend-overlay ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}></div>
                                     </div>
                                 </div>
                             );
                         })}
                    </div>
                    
                    {/* Center Logo/Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-40 md:h-40 bg-brand-card rounded-full border-4 border-brand-gold/50 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.2)] z-10">
                         <div className="text-center">
                             <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-widest">Select</div>
                             <div className="text-lg md:text-3xl font-display font-bold text-white">GAME</div>
                         </div>
                    </div>
                </div>

                {/* 3. Content Info (Right Side) */}
                <div className={`flex-1 md:pl-24 mt-6 md:mt-0 relative h-[280px] md:h-[400px] w-full flex items-center transition-opacity duration-500 pointer-events-none ${progress > 0.1 ? 'opacity-100' : 'opacity-0'}`}>
                    {CATEGORIES.map((cat, idx) => (
                        <div 
                            key={cat.id}
                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out transform ${
                                activeIndex === idx 
                                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                                : activeIndex < idx 
                                    ? 'opacity-0 translate-y-20 pointer-events-none' 
                                    : 'opacity-0 -translate-y-20 pointer-events-none'
                            }`}
                        >
                            <h3 className={`text-base md:text-xl font-bold uppercase tracking-widest mb-2 ${cat.color}`}>
                                {cat.subtitle}
                            </h3>
                            <h2 className="text-3xl md:text-7xl font-display font-black text-white mb-4 md:mb-6 leading-none">
                                {cat.title}
                            </h2>
                            <div className="w-16 md:w-24 h-1 bg-brand-gold/50 mb-4 md:mb-8"></div>
                            <p className="text-gray-300 text-sm md:text-xl font-light leading-relaxed mb-6 md:mb-10 max-w-xl line-clamp-3 md:line-clamp-none">
                                {cat.desc}
                            </p>
                            
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-brand-gold text-black font-bold font-display uppercase tracking-wider rounded hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] text-sm md:text-base">
                                    <Play className="w-4 h-4 md:w-5 md:h-5 fill-black" /> Play Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            
            {/* Scroll Progress Indicator (Desktop) */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 h-48 hidden md:flex flex-col justify-between items-center z-30">
                {CATEGORIES.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`w-1 transition-all duration-300 rounded-full ${activeIndex === idx ? 'h-8 bg-brand-gold' : 'h-2 bg-white/10'}`}
                    ></div>
                ))}
            </div>

        </div>
    </section>
  );
};
