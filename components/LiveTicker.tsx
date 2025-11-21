import React from 'react';
import { TrendingUp } from 'lucide-react';

const recentWins = [
    { user: 'User88**', game: 'Cockfighting', amount: '₱85,400', type: 'win' },
    { user: 'Mike_**', game: 'Crazy 777', amount: '₱12,500', type: 'win' },
    { user: 'VIP_J**', game: 'Baccarat', amount: '₱250,000', type: 'jackpot' },
    { user: 'Anna**', game: 'Fishing', amount: '₱8,200', type: 'win' },
    { user: 'Tom99**', game: 'Sports', amount: '₱45,000', type: 'win' },
    { user: 'King**', game: 'Slots', amount: '₱1,200,000', type: 'jackpot' },
];

export const LiveTicker: React.FC = () => {
  return (
    <div className="bg-brand-card border-y border-white/5 relative z-30 overflow-hidden h-12 flex items-center">
        <div className="absolute left-0 top-0 bottom-0 bg-brand-card z-10 px-4 flex items-center border-r border-white/5">
            <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Wins
            </div>
        </div>
        
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap pl-32">
            {[...recentWins, ...recentWins].map((win, i) => (
                <div key={i} className="flex items-center gap-2 mx-8 text-sm font-mono">
                    <span className="text-gray-500">{win.user}</span>
                    <span className="text-gray-300">{win.game}</span>
                    <span className={`${win.type === 'jackpot' ? 'text-brand-gold font-bold' : 'text-brand-DEFAULT'}`}>
                        +{win.amount}
                    </span>
                    {win.type === 'jackpot' && <TrendingUp className="w-3 h-3 text-brand-gold" />}
                </div>
            ))}
        </div>
    </div>
  );
};