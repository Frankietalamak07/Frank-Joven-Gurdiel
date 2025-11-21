
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Shield, Lock } from 'lucide-react';
import { Tg777Logo } from './Tg777Logo';

export const Footer: React.FC = () => {
  const footerLinks = {
      Games: [
          { name: 'Slots', href: '#slots' },
          { name: 'Live Casino', href: '#live-casino' },
          { name: 'Fishing Games', href: '#fishing' },
          { name: 'Cockfighting', href: '#sabong' },
          { name: 'Card Games', href: '#cards' },
      ],
      Platform: [
          { name: 'About Us', href: '#about-us' },
          { name: 'Promotions', href: '#promotion' },
          { name: 'Download App', href: '#download' },
          { name: 'VIP Program', href: '#promotion' },
      ],
      Support: [
          { name: 'Contact Us', href: '#' },
          { name: 'Terms & Conditions', href: '#' },
          { name: 'Privacy Policy', href: '#' },
          { name: 'Responsible Gaming', href: '#' },
      ]
  };

  return (
    <footer className="bg-brand-card border-t border-brand-gold/10 pt-20 pb-10 relative">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
                <Tg777Logo className="h-10" />
            </div>
            <p className="text-gray-500 max-w-md mb-8 text-sm leading-relaxed font-sans">
              The leading premium online gaming destination in the Philippines. 
              Certified fair play, instant crypto settlements, and 24/7 VIP concierge support.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-gold/30">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-display font-bold mb-6 uppercase tracking-widest text-xs text-brand-gold">{category}</h4>
                <ul className="space-y-3 text-sm text-gray-400 font-sans">
                  {links.map((link) => (
                    <li key={link.name}>
                        <a href={link.href} className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">
                            {link.name}
                        </a>
                    </li>
                  ))}
                </ul>
              </div>
          ))}

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">
            Copyright © 2025 PlayTG777.VIP. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-gold" /> <span className="text-xs uppercase font-bold tracking-wider">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-gold" /> <span className="text-xs uppercase font-bold tracking-wider">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
