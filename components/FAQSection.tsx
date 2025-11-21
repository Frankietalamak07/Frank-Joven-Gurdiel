
import React, { useState } from 'react';
import { Plus, Minus, ShieldCheck, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Is PlayTG777.VIP licensed and legitimate?",
    answer: "Yes, TG777 operates under a valid gaming license issued by PAGCOR (Philippine Amusement and Gaming Corporation). We strictly adhere to regulatory standards to ensure fair play, transparency, and the absolute security of our players' funds and data."
  },
  {
    question: "How fast are deposits and withdrawals?",
    answer: "We pride ourselves on industry-leading speed. GCash, Maya, and Crypto (USDT/BTC) deposits are instant. Withdrawals via these methods are typically processed within 5-10 minutes depending on network traffic. Bank transfers may take 1-24 hours."
  },
  {
    question: "Is my personal information safe?",
    answer: "Absolutely. We utilize banking-grade 256-bit SSL encryption and enterprise-level firewalls to protect your personal data and financial transactions. We never share your information with third parties without your consent."
  },
  {
    question: "What should I do if I encounter an issue?",
    answer: "Our VIP Concierge team is available 24/7. You can reach us instantly via the Live Chat widget on the bottom right, through our official Telegram channel, or via email. Our average response time is under 2 minutes."
  },
  {
    question: "Are the games fair?",
    answer: "All games on TG777 use certified Random Number Generators (RNG) audited by independent testing agencies like GLI and BMM Testlabs. This guarantees that every spin, deal, and roll is completely random and unbiased."
  },
  {
    question: "Can I play on my mobile device?",
    answer: "Yes! You can download our native app for iOS and Android for the smoothest experience, or simply play directly through your mobile browser. Our platform is fully optimized for mobile play."
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden border-t border-white/5" id="faq">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <HelpCircle className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-display font-bold text-gray-300 uppercase tracking-widest">Support Center</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
                Everything you need to know about our platform, security, and VIP services.
            </p>
        </div>

        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div 
                    key={index} 
                    className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                        openIndex === index 
                        ? 'bg-brand-card border-brand-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                        : 'bg-brand-card/50 border-white/5 hover:border-white/20'
                    }`}
                >
                    <button 
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        aria-expanded={openIndex === index}
                    >
                        <span className={`font-display font-bold text-lg transition-colors duration-300 ${openIndex === index ? 'text-brand-gold' : 'text-gray-200 group-hover:text-white'}`}>
                            {faq.question}
                        </span>
                        <span className={`ml-4 flex-shrink-0 p-1 rounded-full border transition-all duration-300 ${openIndex === index ? 'bg-brand-gold text-black border-brand-gold rotate-180' : 'border-white/20 text-gray-400 group-hover:border-white/50 group-hover:text-white'}`}>
                            {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                    </button>
                    
                    <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="px-6 pb-6 text-gray-400 font-sans leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Verified & Secure Platform</span>
            </div>
        </div>
      </div>
    </section>
  );
};
