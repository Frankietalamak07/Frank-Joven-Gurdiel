
import React, { useEffect, useRef, useState } from 'react';

const scenes = [
  {
    id: 1,
    label: "MORE",
    title: "THRILLS",
    desc: "Experience the heart-pounding rush of TG777, the premier online casino choice for elite players."
  },
  {
    id: 2,
    label: "MORE",
    title: "EXCITEMENT",
    desc: "High stakes, instant payouts, and the unmatched excitement of the TG777 platform."
  },
  {
    id: 3,
    label: "MORE",
    title: "LIT WEEKENDS",
    desc: "Exclusive TG777 tournaments and VIP rewards happening every weekend."
  },
  {
    id: 4,
    label: "MORE",
    title: "STAR-STUDDED NIGHTS",
    desc: "Rub shoulders with the elite in TG777's private lounges and gala events."
  },
  {
    id: 5,
    label: "MORE",
    title: "FUN",
    desc: "Your ultimate destination for luxury entertainment. Discover the power of TG777."
  }
];

export const BrandVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);

  // Handle Video Autoplay based on Visibility - Robust Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Play when entering (or approaching) viewport, pause only when completely gone
          if (entry.isIntersecting) {
            video.play().catch((e) => {
                console.debug("Video play interrupted:", e);
            });
          } else {
            video.pause();
          }
        });
      },
      { 
        threshold: 0,
        rootMargin: "200px 0px" // Keep playing even if 200px off screen
      } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrolled = -top;
      const totalScrollableHeight = height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      
      // Use RAF for smoother state updates during heavy scrolling
      requestAnimationFrame(() => {
          setProgress(rawProgress);
          const sceneIndex = Math.min(
            scenes.length - 1,
            Math.floor(rawProgress * scenes.length)
          );
          setActiveScene(sceneIndex);
      });
    };

    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="brand-video" ref={containerRef} className="relative h-[350vh] md:h-[500vh] bg-black" aria-label="TG777 Brand Experience">
      <div className="sticky top-0 h-[100vh] h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Video Background with Ken Burns Effect */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
             <div 
                className="absolute inset-0 w-full h-full transition-transform duration-100 ease-linear will-change-transform"
                style={{ transform: `scale(${1 + (progress * 0.2)})` }}
             >
                 <video 
                    ref={videoRef}
                    autoPlay
                    muted 
                    loop 
                    playsInline
                    disablePictureInPicture
                    className="w-full h-full object-cover opacity-40"
                    onEnded={() => {
                        // Fallback to ensure loop happens seamlessly
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play().catch(() => {});
                        }
                    }}
                 >
                    <source src="https://playtg777.vip/assets/video/tg777-casino-intro.mp4" type="video/mp4" />
                 </video>
             </div>
             {/* Vignette & Overlays */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/50 via-transparent to-black/80 md:to-black/50"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto w-full h-full">
             {/* Scenes Text */}
             <div className="relative w-full h-full flex items-center justify-center">
                {scenes.map((scene, index) => {
                    const isActive = index === activeScene;
                    const isPast = index < activeScene;
                    
                    return (
                    <article 
                        key={scene.id}
                        className={`absolute flex flex-col items-center justify-center w-full px-4 transition-all duration-1000 ease-out ${
                            isActive ? 'z-20' : 'z-10 pointer-events-none'
                        }`}
                    >
                        {/* Label: Fades in from top */}
                        <h3 className={`text-sm md:text-3xl font-display font-bold text-transparent stroke-white tracking-[0.2em] md:tracking-[0.3em] opacity-70 mb-2 md:mb-4 transition-all duration-1000 ${
                            isActive 
                            ? 'opacity-70 translate-y-0 blur-0' 
                            : isPast 
                                ? 'opacity-0 -translate-y-8 blur-sm' 
                                : 'opacity-0 -translate-y-8 blur-sm'
                        }`} style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                            {scene.label}
                        </h3>

                        {/* Title: Dramatic Scale and Blur */}
                        <h2 className={`text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black text-brand-gold uppercase tracking-tighter drop-shadow-[0_0_40px_rgba(212,175,55,0.4)] leading-none mb-4 md:mb-6 break-words w-full transition-all duration-1000 delay-100 ${
                            isActive 
                            ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                            : isPast 
                                ? 'opacity-0 -translate-y-24 scale-110 blur-xl' 
                                : 'opacity-0 translate-y-24 scale-90 blur-xl'
                        }`}>
                            {scene.title}
                        </h2>

                        {/* Description: Fades in from bottom */}
                        <p className={`text-sm sm:text-lg md:text-2xl text-gray-300 font-sans font-light tracking-wide max-w-[90%] md:max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
                            isActive 
                            ? 'opacity-100 translate-y-0 blur-0' 
                            : isPast 
                                ? 'opacity-0 translate-y-8 blur-sm' 
                                : 'opacity-0 translate-y-8 blur-sm'
                        }`}>
                            {scene.desc}
                        </p>
                    </article>
                )})}
             </div>
        </div>

        {/* Scroll Indicator / Progress */}
        <div className="absolute bottom-8 md:bottom-10 w-full px-8 md:px-16 z-20">
            <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs font-mono text-brand-gold/60 max-w-[200px] md:max-w-3xl mx-auto">
                <span>01</span>
                <div className="flex-1 h-[2px] md:h-[3px] bg-white/10 relative rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-gold/0 via-brand-gold to-white shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-100 ease-out" 
                        style={{ width: `${progress * 100}%` }}
                    >
                        {/* Pulsating Tip Glow */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-12 h-4 bg-white/80 rounded-full blur-[8px] animate-pulse"></div>
                    </div>
                </div>
                <span>05</span>
            </div>
            <div className="text-center mt-2 md:mt-4 text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase animate-pulse">
                Scroll to Explore
            </div>
        </div>

      </div>
    </section>
  );
};
