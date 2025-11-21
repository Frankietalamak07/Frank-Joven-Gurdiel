
import React from 'react';
import { Calendar, TrendingUp, ArrowRight, Download, Share2 } from 'lucide-react';

const NEWS_ITEMS = [
  {
    id: 1,
    title: "Lotto Result November 20, 2025",
    category: "Lottery",
    date: "Nov 20, 2025",
    image: "https://playtg777.vip/assets/Lotto%20today!.jpg",
    summary: "Check the latest winning numbers for the Grand Lotto 6/55 and Mega Lotto 6/45 draw. Did you hit the jackpot tonight?"
  },
  {
    id: 2,
    title: "Spurs vs Hawks",
    category: "NBA",
    date: "Nov 20, 2025",
    image: "https://placehold.co/600x400/151921/BF953F?text=Spurs+vs+Hawks",
    summary: "Game highlights, key stats, and final score analysis from the intense Spurs vs Hawks showdown."
  },
  {
    id: 3,
    title: "Magic vs Clippers",
    category: "NBA",
    date: "Nov 20, 2025",
    image: "https://placehold.co/600x400/151921/BF953F?text=Magic+vs+Clippers",
    summary: "A nail-biting finish! Read the full recap of player performances and turning points in the Magic vs Clippers matchup."
  },
  {
    id: 4,
    title: "Grizzlies vs Kings",
    category: "NBA",
    date: "Nov 20, 2025",
    image: "https://playtg777.vip/assets/grizzlies%20vs%20kings.jpg",
    summary: "The Grizzlies take on the Kings in a high-scoring affair. See who dominated the court in this Western Conference battle."
  },
  {
    id: 5,
    title: "Bucks vs 76ers",
    category: "NBA",
    date: "Nov 20, 2025",
    image: "https://athlonsports.com/.image/w_384,q_auto:good,c_limit/MjE0NzQ1Njg0NzQwNDE2NTM1/bucks-news.jpg",
    summary: "Final Injury Report for 76ers-Bucks. Check the latest squad updates before the Eastern Conference giants collide."
  },
  {
    id: 6,
    title: "iWant Miss Universe by Playtime Ph",
    category: "Entertainment",
    date: "Nov 20, 2025",
    image: "https://contents.pep.ph/images2/images2/2025/10/10/motherhouse-draft-88-1760059989.jpg",
    summary: "PlayTime joins Miss Universe 2025 as Major Sponsor and Official Journey Partner, as the prestigious pageant returns for its 74th edition."
  }
];

export const DailyNews: React.FC = () => {
    
    const handleDownload = (e: React.MouseEvent, item: typeof NEWS_ITEMS[0]) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Create a dummy download for the demo or handle real image download
        // For cross-origin images, we might need to open in new tab or fetch blob
        const link = document.createElement('a');
        link.href = item.image;
        link.target = "_blank";
        link.download = `TG777-${item.title.replace(/\s+/g, '-')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="py-20 bg-brand-dark border-b border-white/5 relative overflow-hidden" id="news">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1d24]/50 to-transparent pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs mb-2">
                            <TrendingUp className="w-4 h-4" /> Latest Updates
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                            Daily News <span className="text-gold-gradient">PH</span>
                        </h2>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-widest group">
                        View Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {NEWS_ITEMS.map((item) => (
                        <article 
                            key={item.id} 
                            className="group flex flex-col bg-brand-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        >
                            {/* Hero Image Space */}
                            <div className="relative aspect-[16/9] overflow-hidden bg-black">
                                <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay pointer-events-none"></div>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest rounded-lg">
                                        {item.category}
                                    </span>
                                </div>
                                
                                {/* Download Action */}
                                <button 
                                    onClick={(e) => handleDownload(e, item)}
                                    className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-gold hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                    title="Download Image"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-3">
                                    <Calendar className="w-3 h-3" />
                                    {item.date}
                                </div>
                                
                                <h3 className="text-xl font-bold text-white font-display mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                                    {item.title}
                                </h3>
                                
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                                    {item.summary}
                                </p>
                                
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest group-hover:underline decoration-brand-gold/50 underline-offset-4">
                                        Read Story
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 text-gray-400 hover:text-white transition-colors">
                                            <Share2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-colors duration-300">
                                            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
