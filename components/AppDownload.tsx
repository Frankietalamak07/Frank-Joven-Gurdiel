
import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Apple, Play, Loader2, CheckCircle, Download, FileText, Image as ImageIcon } from 'lucide-react';

export const AppDownload: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [downloadState, setDownloadState] = useState<{ 
    platform: 'ios' | 'android' | 'file' | null; 
    status: 'idle' | 'loading' | 'success'; 
  }>({ platform: null, status: 'idle' });

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

  const handleDownload = (platform: 'ios' | 'android' | 'file', filename?: string) => {
    if (downloadState.status === 'loading') return;

    setDownloadState({ platform, status: 'loading' });

    // Determine Filename
    const actualFilename = filename || (platform === 'ios' ? 'TG777_VIP_Installer_v2.mobileconfig' : 'TG777_VIP_App_v2.0.apk');
    
    const content = `[TG777 VIP FILE DOWNLOAD]
File Name: ${actualFilename}
Version: 2.0.5
Date: ${new Date().toISOString()}
Signature: Valid (SHA-256)

This is a secure file download from PlayTG777.VIP.
`;
    
    setTimeout(() => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = actualFilename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setDownloadState({ platform, status: 'success' });
        
        // Reset after 3 seconds
        setTimeout(() => {
            setDownloadState({ platform: null, status: 'idle' });
        }, 3000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="download" className="py-32 bg-brand-dark relative overflow-hidden">
       {/* Background Mesh */}
       <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:30px_30px] opacity-10"></div>

       <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
           {/* Gradient Border Wrapper */}
           <div className="p-[2px] rounded-3xl bg-gold-gradient shadow-2xl">
               <div className="bg-brand-dark/95 backdrop-blur-xl rounded-[22px] p-8 md:p-16 relative overflow-hidden group h-full">
                   {/* Abstract Device Glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px] group-hover:bg-brand-gold/15 transition-colors duration-1000"></div>

                   <div className="relative z-10 flex flex-col items-center text-center">
                       <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8">
                           <Smartphone className="w-4 h-4 text-brand-gold" />
                           <span className="text-xs font-display font-bold text-brand-gold uppercase tracking-widest">Native App v2.0</span>
                       </div>

                       <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tight">
                           Gaming in Your Pocket
                           <br />
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Anytime. Anywhere.</span>
                       </h2>

                       <p className="text-lg text-gray-300 max-w-xl mb-10 font-sans font-light">
                           Download the official <span className="text-brand-gold font-bold">PlayTG777.VIP</span> app. 
                           Experience biometric login, exclusive mobile-only bonuses, and lightning-fast loading times.
                       </p>

                       <div className="flex flex-col sm:flex-row gap-4 mb-12">
                           {/* App Store Button */}
                           <button 
                               onClick={() => handleDownload('ios')}
                               disabled={downloadState.status === 'loading'}
                               className="flex items-center gap-4 px-8 py-4 bg-white text-black rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] min-w-[240px] justify-center"
                           >
                               {downloadState.platform === 'ios' && downloadState.status === 'loading' ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                               ) : downloadState.platform === 'ios' && downloadState.status === 'success' ? (
                                    <div className="flex items-center gap-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                        <div className="text-left">
                                            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Download</div>
                                            <div className="text-xl font-bold leading-none font-display text-green-700">Started</div>
                                        </div>
                                    </div>
                               ) : (
                                    <>
                                        <Apple className="w-8 h-8" />
                                        <div className="text-left">
                                            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Download on the</div>
                                            <div className="text-xl font-bold leading-none font-display">App Store</div>
                                        </div>
                                    </>
                               )}
                           </button>

                           {/* Google Play Button */}
                           <button 
                               onClick={() => handleDownload('android')}
                               disabled={downloadState.status === 'loading'}
                               className="flex items-center gap-4 px-8 py-4 bg-black/50 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm min-w-[240px] justify-center"
                           >
                               {downloadState.platform === 'android' && downloadState.status === 'loading' ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                               ) : downloadState.platform === 'android' && downloadState.status === 'success' ? (
                                    <div className="flex items-center gap-4">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                        <div className="text-left">
                                            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Download</div>
                                            <div className="text-xl font-bold leading-none font-display text-green-500">Started</div>
                                        </div>
                                    </div>
                               ) : (
                                    <>
                                        <Play className="w-8 h-8 fill-white" />
                                        <div className="text-left">
                                            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Get it on</div>
                                            <div className="text-xl font-bold leading-none font-display">Google Play</div>
                                        </div>
                                    </>
                               )}
                           </button>
                       </div>

                       {/* Useful Files & Guides Section */}
                       <div className="w-full max-w-3xl border-t border-white/5 pt-8">
                            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-widest mb-6">Useful Resources & Files</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button 
                                    onClick={() => handleDownload('file', 'TG777_VIP_Guide_2025.pdf')}
                                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-brand-gold/30 transition-all group"
                                >
                                    <div className="p-2 bg-brand-gold/10 rounded text-brand-gold group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-sm font-bold">VIP Handbook</div>
                                        <div className="text-gray-500 text-xs">PDF • 2.4 MB</div>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => handleDownload('file', 'TG777_Game_Rules.pdf')}
                                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-brand-gold/30 transition-all group"
                                >
                                    <div className="p-2 bg-brand-gold/10 rounded text-brand-gold group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-sm font-bold">Game Rules</div>
                                        <div className="text-gray-500 text-xs">PDF • 5.1 MB</div>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => handleDownload('file', 'TG777_Wallpapers.zip')}
                                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-brand-gold/30 transition-all group"
                                >
                                    <div className="p-2 bg-brand-gold/10 rounded text-brand-gold group-hover:scale-110 transition-transform">
                                        <ImageIcon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-sm font-bold">Assets Pack</div>
                                        <div className="text-gray-500 text-xs">ZIP • 15 MB</div>
                                    </div>
                                </button>
                            </div>
                       </div>
                       
                   </div>
               </div>
           </div>
       </div>
    </section>
  );
};
