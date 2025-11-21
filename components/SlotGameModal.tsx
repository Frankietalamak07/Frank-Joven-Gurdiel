
import React, { useState, useEffect } from 'react';
import { X, RotateCw, Coins, Trophy, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const SYMBOLS = ['👑', '💎', '7️⃣', '🔔', '🍒', '🍇'];
const PAYOUTS: { [key: string]: number } = {
    '👑': 50,
    '💎': 20,
    '7️⃣': 10,
    '🔔': 5,
    '🍒': 3,
    '🍇': 2
};

const BET_AMOUNTS = [10, 20, 50, 100, 500];

export const SlotGameModal: React.FC<{ onClose: () => void, gameTitle: string }> = ({ onClose, gameTitle }) => {
    const { user, updateBalance } = useAuth();
    const [reels, setReels] = useState(['7️⃣', '7️⃣', '7️⃣']);
    const [isSpinning, setIsSpinning] = useState(false);
    const [bet, setBet] = useState(10);
    const [winAmount, setWinAmount] = useState(0);
    const [message, setMessage] = useState("Good Luck!");

    const spin = () => {
        if (!user) return;
        if (user.balance < bet) {
            setMessage("Insufficient funds!");
            return;
        }
        if (isSpinning) return;

        setIsSpinning(true);
        setWinAmount(0);
        setMessage("Spinning...");
        
        // Deduct bet immediately
        updateBalance(-bet);

        // Spin animation duration
        const spinDuration = 1500;
        
        // Animate reels
        const interval = setInterval(() => {
            setReels([
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
            ]);
        }, 100);

        // Stop spin and calculate result
        setTimeout(() => {
            clearInterval(interval);
            
            // Generate final result
            // Weighted random could go here, for now pure random
            const finalReels = [
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
            ];
            
            // Force win for demo purposes occasionally if username contains "admin" (Optional cheat)
            // if (user.username.toLowerCase().includes('admin') && Math.random() > 0.5) {
            //    finalReels = ['👑', '👑', '👑'];
            // }

            setReels(finalReels);
            checkWin(finalReels);
            setIsSpinning(false);
        }, spinDuration);
    };

    const checkWin = (result: string[]) => {
        const [r1, r2, r3] = result;
        
        // 3 Match
        if (r1 === r2 && r2 === r3) {
            const multiplier = PAYOUTS[r1];
            const win = bet * multiplier;
            updateBalance(win);
            setWinAmount(win);
            setMessage(`JACKPOT! You won ₱${win}!`);
        } 
        // 2 Match (Any position - simplified)
        else if (r1 === r2 || r2 === r3 || r1 === r3) {
             const symbol = r1 === r2 ? r1 : r3; // Get the matching symbol
             const multiplier = 1.5; // Small win
             const win = Math.floor(bet * multiplier);
             updateBalance(win);
             setWinAmount(win);
             setMessage(`Nice! Small win: ₱${win}`);
        } else {
            setMessage("Try again!");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg bg-brand-card border border-brand-gold/30 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-card to-[#1a1d24] p-4 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-brand-gold" />
                        <span className="text-white font-bold font-display">{gameTitle}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Balance Display */}
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                         <span className="text-gray-400 text-xs uppercase tracking-wider">Balance</span>
                         <span className="text-brand-gold font-mono font-bold text-xl">₱{user?.balance.toFixed(2)}</span>
                    </div>

                    {/* Slot Machine Screen */}
                    <div className="relative bg-[#0a0a0a] p-4 rounded-xl border-[4px] border-[#D4AF37] shadow-inner">
                        {/* Reels Container */}
                        <div className="flex gap-2 md:gap-4 h-32 md:h-40 bg-white/5 rounded-lg overflow-hidden p-2 relative">
                            {/* Win Line */}
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/50 z-10"></div>
                            
                            {reels.map((symbol, i) => (
                                <div key={i} className="flex-1 bg-white/90 rounded-md flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                                    <div className={`text-4xl md:text-6xl transition-all duration-100 ${isSpinning ? 'blur-sm scale-110' : 'scale-100'}`}>
                                        {symbol}
                                    </div>
                                    {/* Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Win Message Overlay */}
                        <div className="mt-4 text-center h-8">
                            <span className={`text-lg font-bold font-display tracking-wider animate-pulse ${winAmount > 0 ? 'text-green-400' : 'text-brand-gold'}`}>
                                {message}
                            </span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                        <div className="flex justify-center gap-2">
                            {BET_AMOUNTS.map(amount => (
                                <button
                                    key={amount}
                                    onClick={() => setBet(amount)}
                                    disabled={isSpinning}
                                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                        bet === amount 
                                        ? 'bg-brand-gold text-black scale-110 shadow-lg' 
                                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                    }`}
                                >
                                    ₱{amount}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={spin}
                            disabled={isSpinning || (user?.balance || 0) < bet}
                            className={`w-full py-4 rounded-xl font-black text-xl uppercase tracking-widest shadow-[0_5px_0_rgb(180,130,0)] active:shadow-none active:translate-y-[5px] transition-all flex items-center justify-center gap-3 ${
                                isSpinning 
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed shadow-none translate-y-[5px]' 
                                : (user?.balance || 0) < bet
                                    ? 'bg-red-900/50 text-red-200 border border-red-500/30 cursor-not-allowed shadow-none'
                                    : 'bg-gradient-to-b from-[#FFD700] to-[#B8860B] text-black hover:brightness-110'
                            }`}
                        >
                            {isSpinning ? (
                                <RotateCw className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    SPIN <span className="text-xs opacity-60 font-mono self-center pt-1">(₱{bet})</span>
                                </>
                            )}
                        </button>

                        {(user?.balance || 0) < bet && (
                             <div className="text-center text-red-400 text-xs flex items-center justify-center gap-1">
                                 <AlertCircle className="w-3 h-3" /> Insufficient balance for this bet
                             </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
