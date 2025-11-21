import React, { useEffect, useRef, useState } from 'react';
import { Crown, CheckCircle2, Gem } from 'lucide-react';
import { Button } from './Button';

export const VipSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
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

  const benefits = [
    "Exclusive Daily Cashback",
    "Personal Account Manager",
    "Faster Crypto Withdrawals",
    "Birthday Gold Bonuses",
    "Priority Support"
  ];

  return (
    <section ref={sectionRef} id="promotion" className="py-24 bg-brand-dark relative overflow-hidden">
       
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-sm font-display">
              <Crown className="w-5 h-5 fill-current" /> VIP Access Only
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              THE <span className="text-gold-gradient">ROYAL</span> TREATMENT
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              PlayTG777.VIP isn't just a casino; it's a status symbol. 
              Progress through our metallic tiers—from Silver to Black Diamond—and unlock financial privileges unavailable to the public.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-mono text-sm">
                  <Gem className="w-4 h-4 text-brand-gold" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="pt-6">
                <Button variant="primary">
                Apply for Membership
                </Button>
            </div>
          </div>

          {/* Image Content - Black Card Aesthetic */}
          <div className="flex-1 relative w-full max-w-md">
             <div className="relative aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group hover:rotate-y-12 hover:scale-105 transition-all duration-500 perspective-1000">
                {/* Card Background Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand-gold/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="text-2xl font-display font-bold text-white tracking-widest">
                        PLAYTG777<span className="text-brand-gold">.VIP</span>
                    </div>
                    <Crown className="w-8 h-8 text-brand-gold" />
                </div>

                <div className="relative z-10">
                    <div className="flex gap-4 mb-4">
                        <div className="w-12 h-8 bg-brand-gold/20 rounded border border-brand-gold/30 flex items-center justify-center">
                            <div className="w-8 h-6 border border-brand-gold/50 rounded-sm"></div>
                        </div>
                    </div>
                    <div className="font-mono text-xl text-gray-300 tracking-[0.15em] mb-2">
                        **** **** **** 7777
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="text-xs text-gray-500 font-mono uppercase">
                            Member Since<br/>
                            <span className="text-white">2025</span>
                        </div>
                        <div className="text-brand-gold font-display font-bold uppercase tracking-widest">
                            Black Diamond
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};