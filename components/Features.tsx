import React from 'react';
import { Gamepad2, Dices, Coins } from 'lucide-react';

const features = [
  {
    title: "Slots",
    desc: "Spin the reels and aim for massive wins with Sugar Rush and more.",
    img: "https://kingtg777.com/wp-content/uploads/2025/07/sugar-rush100-pp-slots.png",
    icon: <Gamepad2 className="w-6 h-6" />,
    color: "from-pink-500/20 to-purple-500/20"
  },
  {
    title: "Bingo",
    desc: "Get ready for a game of numbers and quick wins. Join the community.",
    img: "https://kingtg777.com/wp-content/uploads/2025/07/Jackpot-bingo-banner.png",
    icon: <Dices className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Casino",
    desc: "Authentic blackjack, roulette, and baccarat with live dealers.",
    img: "https://kingtg777.com/wp-content/uploads/2025/07/luckybaccarat-banner.png",
    icon: <Coins className="w-6 h-6" />,
    color: "from-amber-500/20 to-orange-500/20"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 hover:border-brand-DEFAULT/50 transition-all duration-500">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-lg text-brand-DEFAULT group-hover:bg-brand-DEFAULT group-hover:text-brand-darker transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">0{idx + 1}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-8 line-clamp-2 group-hover:text-gray-200 transition-colors">
                  {feature.desc}
                </p>

                <div className="mt-auto relative h-64 w-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent z-10" />
                  <img 
                    src={feature.img} 
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};