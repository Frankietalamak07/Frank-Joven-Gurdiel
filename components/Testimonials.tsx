
import React from 'react';
import { Twitch, Youtube, Globe } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: "JuicySpins",
        role: "Twitch Streamer",
        img: "https://static-cdn.jtvnw.net/jtv_user_pictures/23e6e22b-a0c2-4f7a-8ab1-345330784050-profile_image-150x150.png",
        text: "I managed to get a super interactive stream for all my viewers. The Widgets they provide like the Bonushunts, Tournaments and Guessing Competitions are all fan favorites!",
        links: { twitch: "#", instagram: "#" }
    },
    {
        name: "GGspins",
        role: "Twitch/Kick Streamer",
        img: "https://placehold.co/150x150/1a1d24/BF953F?text=GG",
        text: "Since joining forces, our user interaction has skyrocketed. Their cutting-edge tournament feature has redefined our community experience, sparking excitement and deeper participation.",
        links: { twitch: "#", globe: "#" }
    },
    {
        name: "KingbonusTTV",
        role: "Twitch Streamer",
        img: "https://static-cdn.jtvnw.net/jtv_user_pictures/1e535790-514b-4a8b-ba37-6360068c6d92-profile_image-150x150.png",
        text: "Credits TG777 for transforming our streams. Their intuitive platform and custom OBS overlays have streamlined our operations and captivated our audience.",
        links: { twitch: "#", youtube: "#" }
    }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-16">
                Trusted by <span className="text-brand-gold">Streamers</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((item, idx) => (
                    <div key={idx} className="bg-brand-card p-8 rounded-xl border border-white/5 relative mt-12">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <img 
                                src={item.img} 
                                alt={item.name} 
                                className="w-20 h-20 rounded-full border-4 border-brand-card object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-10 text-center">
                            <h5 className="text-xl font-bold text-white font-display">{item.name}</h5>
                            <span className="text-xs text-brand-gold uppercase tracking-widest">{item.role}</span>
                            
                            <p className="mt-6 text-gray-400 text-sm leading-relaxed italic">
                                "{item.text}"
                            </p>
                            
                            <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/5">
                                <Twitch className="w-5 h-5 text-gray-500 hover:text-[#9146FF] cursor-pointer transition-colors" />
                                <Youtube className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
                                <Globe className="w-5 h-5 text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
