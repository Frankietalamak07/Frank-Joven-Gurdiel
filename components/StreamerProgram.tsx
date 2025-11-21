
import React from 'react';
import { MessageSquare, Video } from 'lucide-react';

export const StreamerProgram: React.FC = () => {
  return (
    <div className="bg-brand-dark pt-24">
        {/* Section 1: Streaming Companion */}
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl font-display font-bold text-white leading-tight">
                            <span className="text-brand-gold">TG777</span> - Your Streaming Companion
                        </h2>
                        <p className="text-gray-400 mt-6 text-lg">
                            TG777 offers you an All-in-One Solution for your Casino Streams. Manage your Casino Offers and Bonushunts on our Platform and we will create custom pages and OBS Overlays for your Viewers.
                        </p>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 mt-10 opacity-70">
                            {/* Tech Logos Placeholder */}
                            {['OBS', 'Twitch', 'Kick', 'YouTube', 'XSplit'].map((tech) => (
                                <div key={tech} className="flex items-center justify-center p-2 border border-white/10 rounded bg-white/5 text-xs font-mono text-gray-400">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                         {/* Replaced video with a stylish container to avoid heavy loads/missing assets, using provided structure */}
                         <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-brand-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.1)] group">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center animate-pulse">
                                    <Video className="w-8 h-8 text-brand-gold" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
                                <p className="text-white font-display text-sm">OBS Integration Preview</p>
                                <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full w-2/3 bg-brand-gold"></div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Intro Iframe */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative w-full rounded-[25px] border-[3px] border-brand-gold overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                    <h3 className="text-2xl text-white/50 font-display">Introduction Video</h3>
                </div>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>

        {/* Streamer & Moderator Sections */}
        <section className="py-12">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 
                 {/* Streamer */}
                 <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-white font-display">
                             You are a <span className="text-brand-gold">Streamer?</span>
                         </h2>
                         <p className="text-gray-400 mt-4 leading-relaxed">
                             Welcome to the program! We're glad that you are interested in our streaming widgets. Before we can grant you access to our tools, we need to get to know each other.
                         </p>
                         <p className="text-gray-400 mt-4">
                             Join our Discord and open a ticket. We will get back to you as soon as possible.
                         </p>
                         
                         <div className="flex items-center gap-6 mt-8">
                             <a 
                                href="https://discord.gg/EXnW4pgRHP" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#5865F2]/20"
                             >
                                 <MessageSquare className="w-5 h-5" /> JOIN DISCORD
                             </a>
                         </div>
                     </div>
                     <div className="flex-1 flex justify-center">
                         <img 
                            src="https://kingtg777.com/wp-content/uploads/2025/06/cropped-kingph-logo-192x192.avif" 
                            alt="Logo" 
                            className="w-48 opacity-80 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" 
                         />
                     </div>
                 </div>

                 {/* Moderator */}
                 <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                     <div className="flex-1">
                         <h2 className="text-3xl font-bold text-white font-display">
                             You are a <span className="text-brand-gold">Moderator?</span>
                         </h2>
                         <p className="text-gray-400 mt-4 leading-relaxed">
                             One of the most important things in a stream... are You! The Moderators. Thank you for keeping the chat clean and helping out your beloved streamer!
                         </p>
                         <p className="text-gray-400 mt-4">
                             As a Moderator you can support your streamer by updating his Bonushunt list, update personal records and more!
                         </p>
                     </div>
                     <div className="flex-1">
                          <div className="p-8 rounded-2xl bg-brand-card border border-white/5">
                              <div className="flex items-center gap-4 mb-4">
                                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                      <Gavel className="w-6 h-6 text-green-500" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold">Mod Tools</h4>
                                      <p className="text-xs text-gray-500">Manage streams efficiently</p>
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <div className="h-2 w-full bg-white/5 rounded"></div>
                                  <div className="h-2 w-3/4 bg-white/5 rounded"></div>
                              </div>
                          </div>
                     </div>
                 </div>

             </div>
        </section>
    </div>
  );
};

// Helper icon
import { Gavel } from 'lucide-react';
