
import React from 'react';

export const Tg777Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
       {/* Main Badge Container - Rich Ruby/Crimson Background with Bright Gold Border */}
       <div className="relative px-3 py-1 bg-gradient-to-b from-[#990000] via-[#500000] to-[#1a0000] border-[3px] border-[#FFD700] rounded-xl shadow-[0_0_25px_rgba(153,0,0,0.6)] flex items-center gap-1 overflow-hidden ring-1 ring-black/50">
          
          {/* Inner Light Glow/Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ff4d4d]/10 to-transparent pointer-events-none"></div>

          {/* Left: TG (Rich Metallic Gold with Darker Shadows for Contrast) */}
          <div className="font-tech font-black text-3xl italic tracking-tighter text-gradient-gold logo-text-3d leading-none transform -skew-x-6 drop-shadow-sm z-10">
            TG
          </div>

          {/* Divider */}
          <div className="w-[2px] h-6 bg-gradient-to-b from-transparent via-[#FFD700] to-transparent opacity-80 mx-1 z-10"></div>

          {/* Right: 777 (Vibrant Glowing Red with Gold Stroke) */}
          <div className="font-tech font-black text-3xl italic tracking-tighter text-[#ff1a1a] red-text-stroke leading-none transform -skew-x-6 filter drop-shadow-[0_0_10px_rgba(255,0,0,0.6)] z-10">
            777
          </div>
          
          {/* Coins decoration */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] border border-white/20 shadow-lg opacity-90"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] opacity-70"></div>
       </div>
       
       {/* Domain Suffix - Matches the Ruby Theme */}
       <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#2b0000] backdrop-blur px-3 py-0.5 rounded-full border border-[#FFD700]/50 shadow-lg z-20">
          <span className="text-[9px] font-display font-bold text-[#FFD700] tracking-[0.2em] uppercase drop-shadow-md">
            .vip
          </span>
       </div>
    </div>
  );
};
