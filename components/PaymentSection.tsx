import React, { useEffect, useRef, useState } from 'react';
import { Wallet, CreditCard, ArrowRightLeft } from 'lucide-react';

export const PaymentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="py-20 bg-brand-dark border-t border-white/5">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-8">Seamless <span className="text-brand-DEFAULT">Transactions</span></h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-card p-6 rounded-lg border border-white/5 hover:border-brand-DEFAULT/30 transition-colors">
                <Wallet className="w-8 h-8 text-brand-DEFAULT mb-4" />
                <h4 className="text-white font-bold mb-2">Fast Deposits</h4>
                <p className="text-sm text-gray-400">Support for GCash, Maya, UnionBank. Minimum deposit only ₱100.</p>
              </div>
              
              <div className="bg-brand-card p-6 rounded-lg border border-white/5 hover:border-brand-DEFAULT/30 transition-colors">
                <ArrowRightLeft className="w-8 h-8 text-brand-DEFAULT mb-4" />
                <h4 className="text-white font-bold mb-2">Instant Cashout</h4>
                <p className="text-sm text-gray-400">Withdraw your winnings anytime. Flexible and hassle-free.</p>
              </div>

               <div className="bg-brand-card p-6 rounded-lg border border-white/5 hover:border-brand-DEFAULT/30 transition-colors sm:col-span-2">
                <CreditCard className="w-8 h-8 text-brand-DEFAULT mb-4" />
                <h4 className="text-white font-bold mb-2">Low Minimum Bet</h4>
                <p className="text-sm text-gray-400">Start playing with as low as ₱1 on select games.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img 
              src="https://kingtg777.com/wp-content/uploads/2025/06/Deposit-and-withdrawals-819x1024.png" 
              alt="Payment Methods" 
              loading="lazy"
              className="max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
};