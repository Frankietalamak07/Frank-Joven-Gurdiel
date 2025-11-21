
import React from 'react';
import { ListTodo, Percent, Scale, Play, Gavel, Layout, Table, Palette, MousePointer2 } from 'lucide-react';

const FEATURES = [
    {
        icon: <ListTodo className="w-8 h-8" />,
        title: "Bonushunt",
        desc: "Manage your Bonushunts and display stats directly on a prepared Bonushunt page!"
    },
    {
        icon: <Percent className="w-8 h-8" />,
        title: "Wager",
        desc: "Share your Wager process with your Viewers in real-time."
    },
    {
        icon: <Scale className="w-8 h-8" />,
        title: "Profit/Loss",
        desc: "Never lose the overview over your Profit or Losses and display it on stream."
    },
    {
        icon: <Play className="w-8 h-8" />,
        title: "Currently Playing",
        desc: "Display your current playing Slot with stats like RTP, Volatility, and Max Potential."
    },
    {
        icon: <Gavel className="w-8 h-8" />,
        title: "Moderators",
        desc: "Invite Moderators to edit your bonushunt or manage stream settings."
    },
    {
        icon: <Layout className="w-8 h-8" />,
        title: "Casino Offers",
        desc: "Get rid of boring static pages. Manage Offers and get a personalized landing page."
    },
    {
        icon: <Table className="w-8 h-8" />,
        title: "Bonushunt Page",
        desc: "Share your Bonushunt lists with your Viewers. Show Statistics and history."
    },
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Design",
        desc: "Customize your widgets. Change colors, borders and backgrounds to match your brand."
    },
    {
        icon: <MousePointer2 className="w-8 h-8" />,
        title: "Tracking",
        desc: "Monitor and Optimize your affiliate link clicks effectively."
    }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark relative" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                    TG777 <span className="text-brand-gold">Core Features</span>
                 </h2>
                 <p className="text-gray-400 mt-4">Everything you need to power your casino stream.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {FEATURES.map((feature, idx) => (
                    <div 
                        key={idx}
                        className="bg-brand-card p-8 rounded-2xl border border-white/5 hover:border-brand-gold/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                    >
                        <div className="mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-300 inline-block p-3 rounded-full bg-brand-gold/10">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 font-display">{feature.title}</h3>
                        <p className="text-gray-400 font-sans text-sm leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
