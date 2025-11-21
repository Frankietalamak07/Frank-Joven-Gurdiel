
import React, { useEffect, useState, useRef } from 'react';
import { Button } from './Button';
import { ChevronRight, Star, ShieldCheck, PlayCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    setLoaded(true);

    const handleScroll = () => {
      requestAnimationFrame(() => setOffset(window.scrollY));
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      requestAnimationFrame(() => setMousePos({ x, y }));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-dark perspective-1000">
      
      {/* CINEMATIC BACKGROUND LAYER - Parallax Effect (Moves slower than scroll) */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={{ 
            transform: `translateY(${offset * 0.5}px)` // Moves at 50% scroll speed
        }}
      >
         {/* Video Background */}
         <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
         >
            <source src="https://bigdaddy.in/core/views/f6924b8174/assets/video/spotlight.mp4" type="video/mp4" />
         </video>

         {/* Gradient Overlays for depth and text readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark"></div>
         <div className="absolute inset-0 bg-black/20"></div>
         
         {/* CSS Pattern Overlay (Subtle Texture) */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Content - Foreground Parallax (Moves slightly faster than scroll) & Mouse Tilt */}
      <div 
        className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center will-change-transform"
        style={{ 
            transform: `
                translateY(${offset * -0.2}px) 
                rotateX(${mousePos.y * -2}deg) 
                rotateY(${mousePos.x * 2}deg)
            `
        }}
      >
        <div className="flex flex-col items-center">
          
          {/* VIP Badge - Fade In Down */}
          <div 
            className={`glass-panel-gold px-8 py-3 rounded-full mb-10 inline-flex items-center gap-3 transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <Star className="w-4 h-4 text-brand-gold fill-brand-gold animate-[spin_3s_linear_infinite]" />
            <span className="text-xs font-display font-bold tracking-[0.3em] text-brand-gold uppercase">
                The Exclusive High-Roller Club
            </span>
            <Star className="w-4 h-4 text-brand-gold fill-brand-gold animate-[spin_3s_linear_infinite]" />
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-white tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl perspective-500">
            <span 
                className={`block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 relative z-10 transition-all duration-1000 delay-200 transform ${loaded ? 'opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-20 rotate-x-12'}`}
            >
                PLAY
            </span>
            <span 
                className={`block text-gradient-gold relative z-10 transition-all duration-1000 delay-500 transform origin-center ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-sm'}`}
            >
                TG777.VIP
            </span>
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-sans font-medium tracking-wide leading-relaxed transition-all duration-1000 delay-700 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} drop-shadow-md`}
          >
            Ascend to royalty with the <span className="text-brand-gold font-bold border-b border-brand-gold/30 hover:text-white hover:border-white transition-colors cursor-default">highest limits</span>, 
            <span className="text-brand-gold font-bold border-b border-brand-gold/30 mx-2 hover:text-white hover:border-white transition-colors cursor-default">instant crypto payouts</span>, 
            and <span className="text-brand-gold font-bold border-b border-brand-gold/30 hover:text-white hover:border-white transition-colors cursor-default">exclusive cockpit access</span>.
          </p>
          
          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 w-full justify-center max-w-lg mx-auto transition-all duration-1000 delay-[900ms] transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <Button 
                variant="primary" 
                fullWidth 
                onClick={() => window.location.href = '#register'} 
                className="text-lg h-14 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join The Elite <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-sm"></div>
            </Button>
            
            <Button 
                variant="outline" 
                fullWidth 
                className="text-lg h-14 group overflow-hidden bg-black/40 backdrop-blur-md border-white/30 hover:bg-white/10"
            >
               <span className="flex items-center justify-center gap-2 relative z-10 text-white">
                  Explore Games 
                  <PlayCircle className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
               </span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div 
            className={`mt-16 flex flex-wrap justify-center gap-8 text-brand-gold/80 text-[10px] md:text-xs font-display font-bold uppercase tracking-[0.2em] transition-all duration-1000 delay-[1100ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-2 px-4 py-2 border border-brand-gold/20 rounded-full bg-black/40 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
                <ShieldCheck className="w-4 h-4 group-hover:text-brand-gold transition-colors" />
                PAGCOR Licensed
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-brand-gold/20 rounded-full bg-black/40 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                24/7 VIP Concierge
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
