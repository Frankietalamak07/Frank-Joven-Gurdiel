
import React, { useState, useEffect, useRef } from 'react';
import { Tg777Logo } from './Tg777Logo';
import { Lock, LockOpen, ChevronUp } from 'lucide-react';

export const LandingIntro: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTriggered, setIsTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll while visible
    if (isVisible && !isTriggered) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isVisible || isTriggered) return;
      
      const delta = e.deltaY;
      // Adjusted sensitivity for smoother control on various devices
      const sensitivity = 0.12; 
      
      setProgress((prev) => {
        const newProgress = prev + delta * sensitivity;
        return Math.min(Math.max(newProgress, 0), 150);
      });
    };

    // Basic swipe detection for mobile to drive progress
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
    };
    const handleTouchMoveCustom = (e: TouchEvent) => {
        if (!isVisible || isTriggered) return;
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        // Only drive forward
        if (deltaY > 0) {
            setProgress((prev) => Math.min(Math.max(prev + deltaY * 0.05, 0), 150));
            touchStartY = touchY;
        }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMoveCustom, { passive: false });

    if (progress >= 130 && !isTriggered) {
       setIsTriggered(true);
       document.body.style.overflow = ''; // Unlock scroll
       
       // Trigger quick change to 2nd section (Brand Video)
       setTimeout(() => {
         const brandSection = document.getElementById('brand-video');
         if (brandSection) {
            brandSection.scrollIntoView({ behavior: 'smooth' });
         }
       }, 100);

       setTimeout(() => setIsVisible(false), 1000);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMoveCustom);
      document.body.style.overflow = '';
    };
  }, [isVisible, progress, isTriggered]);

  if (!isVisible) return null;

  // Cap animation progress at 100% so it freezes while waiting for exit trigger
  const p = Math.min(progress, 100) / 100;
  const easeP = p * (2 - p); 

  // Opacity Logic
  const lockOpacity = Math.max(0, 1 - p * 10);
  const textOpacity = Math.min(1, Math.max(0, (p - 0.1) * 3));
  const rouletteOpacity = Math.min(1, Math.max(0, (p - 0.2) * 3));
  // Content fades out when triggered or near end
  const contentOpacity = isTriggered ? 0 : Math.max(0, 1 - Math.max(0, p - 0.8) * 5);

  // 3D Text Styles
  const gold3DTextStyle = {
    color: '#FFD700',
    textShadow: `
        0 1px 0 #8a6d2b,
        0 2px 0 #755c24,
        0 3px 0 #614b1d,
        0 4px 0 #4d3a16,
        0 5px 0 #382a0f,
        0 6px 0 #241a08,
        0 7px 0 #150f03,
        0 8px 5px rgba(0,0,0,.5),
        0 0 20px rgba(255,215,0,0.5)
    `,
    background: 'linear-gradient(to bottom, #FFFFE0 0%, #FFD700 50%, #B8860B 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] transition-opacity duration-1000 ${isTriggered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 transition-opacity duration-100 ease-out">
             <video 
                width="100%" 
                height="100%" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-40 grayscale-[50%] mix-blend-luminosity transition-all duration-500"
                style={{ filter: `blur(${Math.max(0, 10 - p * 10)}px)` }} 
            >
                <source src="https://bigdaddy.in/core/views/f6924b8174/assets/video/spotlight.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#1a0000] mix-blend-multiply opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3d0000]/80 to-black"></div>
        </div>

        {/* Lock Screen UI (Fades out on Scroll) */}
        <div 
            className="absolute z-50 bottom-20 left-0 right-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{ opacity: lockOpacity }}
        >
            {/* Welcome Text */}
            <div className="mb-8 text-center animate-in fade-in duration-1000">
                <p className="text-white/60 font-display text-xs md:text-sm tracking-[0.5em] uppercase mb-3">Enter the Realm</p>
                <h2 className="text-4xl md:text-6xl font-decorative font-bold text-brand-gold tracking-[0.2em] uppercase drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    Welcome
                </h2>
            </div>

            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="p-3 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md">
                    <Lock className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <ChevronUp className="w-4 h-4 text-gray-500 animate-bounce" />
                    <span className="text-brand-gold font-display font-bold tracking-[0.3em] uppercase text-xs text-shadow-sm">
                        Scroll to Unlock
                    </span>
                </div>
            </div>
        </div>

        {/* Animation Container */}
        <div 
            className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center perspective-1000 z-20"
            style={{ opacity: contentOpacity }}
        >
            {/* Float Animation for Hero Character (Lock Screen) */}
            <div 
                 className="absolute z-[70] transition-all duration-300 ease-out pointer-events-none"
                 style={{
                     top: '50%',
                     left: '50%',
                     transform: `translate(-50%, -50%) translateY(-180px) translateY(${p * -200}px)`,
                     opacity: lockOpacity
                 }}
            >
                 <img 
                    src="https://placehold.co/500x400/transparent/transparent.png" 
                    alt="Game Characters" 
                    className="w-64 md:w-80 h-auto object-contain animate-float"
                 />
            </div>

            {/* TG777 Logo - The "Anchor" - REVERSED: Zoom IN */}
            <div 
                className="absolute z-[60] transition-transform duration-100 ease-out will-change-transform"
                style={{ 
                    transform: `translate(-50%, -50%) translateY(${p * 20}px) scale(${0.5 + (easeP * 0.7)})`,
                    left: '50%',
                    top: '50%',
                    opacity: 1
                }}
            >
                <Tg777Logo className="h-24 md:h-40" />
            </div>

            {/* WELCOME TO TG777 TEXT - REVERSED: Zoom IN (Starts small) */}
            <div 
                className="absolute z-50 flex flex-col items-center justify-center transition-all duration-100 ease-out will-change-transform text-center"
                style={{ 
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${0.1 + (easeP * 1.1)})`,
                    filter: `blur(${Math.max(0, (1 - textOpacity) * 10)}px)`,
                    opacity: textOpacity
                }}
            >
                <h3 className="text-4xl md:text-7xl font-decorative font-bold text-white tracking-[0.2em] drop-shadow-lg whitespace-nowrap mb-4">
                    WELCOME TO
                </h3>
                <div className="relative">
                     <h1 
                        className="text-7xl md:text-[12rem] font-decorative font-black uppercase leading-none tracking-tighter whitespace-nowrap"
                        style={gold3DTextStyle}
                     >
                        TG777
                     </h1>
                     {/* Shine effect overlay on text */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent bg-[200%_auto] bg-clip-text text-transparent animate-shine pointer-events-none" aria-hidden="true">
                        TG777
                     </div>
                </div>
            </div>

            {/* Roulette Wheel - REVERSED: Zoom OUT (Starts Big) */}
            <div 
                className="absolute z-10 transition-transform duration-75 ease-out flex items-center justify-center"
                style={{
                    transform: `rotate(${150 - (p * 720)}deg) scale(${2.5 - p * 1.5})`,
                    filter: 'grayscale(0.3) sepia(0.4) hue-rotate(-10deg) brightness(0.8) contrast(1.3) drop-shadow(0 25px 50px rgba(0,0,0,0.9))',
                    opacity: rouletteOpacity
                }}
            >
                <img 
                    src="https://bigdaddy.in/core/views/f6924b8174/assets/img/roulette.png" 
                    alt="roulette" 
                    className="w-[600px] md:w-[900px] max-w-none animate-[spin_60s_linear_infinite]" 
                />
            </div>

            {/* Floating Elements (Dice/Coins) - REVERSED: Implode (Start far, move center) */}
             <div 
                className="absolute z-20 transition-transform duration-100 ease-out" 
                style={{ 
                    transform: `translate(${ -600 + (300 * easeP) }px, ${ 300 - (200 * easeP) }px) rotate(${ -45 * p }deg)`,
                    opacity: rouletteOpacity 
                }}
            >
                <img src="https://bigdaddy.in/core/views/f6924b8174/assets/img/dice.png" alt="dice" className="w-24 md:w-40 drop-shadow-2xl" />
            </div>
            <div 
                className="absolute z-20 transition-transform duration-100 ease-out" 
                style={{ 
                    transform: `translate(${ 500 - (250 * easeP) }px, ${ 400 - (250 * easeP) }px) rotate(${ 45 * p }deg)`,
                    opacity: rouletteOpacity 
                }}
            >
                <img src="https://bigdaddy.in/core/views/f6924b8174/assets/img/coin.png" alt="coin" className="w-20 md:w-32 drop-shadow-2xl" />
            </div>
        </div>

        {/* Progress Bar (Only shows after unlock) */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 transition-opacity duration-300 ${p > 0.1 && p < 0.9 ? 'opacity-100' : 'opacity-0'} z-50`}>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                 <div 
                    className="h-full bg-brand-gold transition-all duration-100 ease-out"
                    style={{ width: `${p * 100}%` }}
                 ></div>
            </div>
        </div>
    </div>
  );
};
