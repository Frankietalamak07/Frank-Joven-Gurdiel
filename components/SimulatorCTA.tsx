
import React from 'react';
import { Gamepad2, ArrowRight } from 'lucide-react';

export const SimulatorCTA: React.FC = () => {
  return (
    <section className="py-20 bg-[#080808] border-t border-white/5 relative overflow-hidden" id="simulator">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left order-2 md:order-1 max-w-lg">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                    Master the Reels <br/>
                    <span className="text-gold-gradient">Risk-Free</span>
                  </h2>
                  <p className="text-gray-400 mb-10 leading-relaxed font-sans text-base mx-auto md:mx-0">
                    Not ready to bet real money yet? Perfect your strategy with our partner's extensive library of free simulator slots. 
                    <span className="block mt-2 text-brand-gold">Unlimited credits. Zero risk. Pure fun.</span>
                  </p>
                  
                  <a 
                    href="https://jilibets.fun"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-gold to-[#b8860b] text-black rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 group shadow-lg shadow-brand-gold/20"
                  >
                    <Gamepad2 className="w-5 h-5 fill-black" />
                    <span className="font-bold font-display uppercase tracking-widest text-sm">
                        Try Simulator Slots Free
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
              </div>

              {/* Hero Image - Centered */}
              <div className="flex-1 relative flex justify-center md:justify-center order-1 md:order-2 w-full">
                  {/* Back Glow behind image */}
                  <div className="absolute inset-0 bg-brand-gold/10 blur-3xl rounded-full transform scale-75 animate-pulse"></div>
                  
                  <img 
                    src="https://jilibets.fun/images/jilibets-rabbit.png" 
                    alt="Jilibets Simulator Rabbit" 
                    className="relative w-full max-w-[300px] md:max-w-[450px] h-auto object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:scale-105 transition-transform duration-500 z-10"
                    loading="lazy"
                  />
              </div>

          </div>
       </div>
    </section>
  );
};
