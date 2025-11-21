
import React from 'react';

const LOGOS = [
    "https://kingtg777.com/wp-content/uploads/2025/06/Crazy777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Bravo777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Lucky777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Fire777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Perya-Games-Image.png",
    // Duplicates for infinite scroll effect
    "https://kingtg777.com/wp-content/uploads/2025/06/Crazy777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Bravo777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Lucky777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Fire777-Logo.png",
    "https://kingtg777.com/wp-content/uploads/2025/06/Perya-Games-Image.png",
];

export const PartnerCarousel: React.FC = () => {
  return (
    <section className="py-12 bg-brand-dark border-y border-white/5 overflow-hidden">
        <div className="text-center mb-8">
            <p className="text-white text-lg font-display">Supported Platforms</p>
            <p className="text-gray-500 text-xs font-mono mt-1">Full list available on our Discord</p>
        </div>

        <div className="relative w-full overflow-hidden">
            <div className="flex w-[200%] animate-[marquee_20s_linear_infinite] items-center gap-16">
                {LOGOS.map((logo, index) => (
                    <div key={index} className="w-24 md:w-32 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                        <img src={logo} alt="Partner" className="w-full h-auto object-contain" loading="lazy" />
                    </div>
                ))}
                {LOGOS.map((logo, index) => (
                    <div key={`dup-${index}`} className="w-24 md:w-32 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                        <img src={logo} alt="Partner" className="w-full h-auto object-contain" loading="lazy" />
                    </div>
                ))}
            </div>
            
            {/* Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-10"></div>
        </div>
    </section>
  );
};
