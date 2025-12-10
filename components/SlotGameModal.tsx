
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, RotateCw, Coins, Trophy, AlertCircle, Club, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from './AuthContext';

const BET_AMOUNTS = [10, 20, 50, 100, 500];

// --- Audio Controller Class ---
class SlotAudioController {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isMuted: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
                this.masterGain = this.ctx.createGain();
                this.masterGain.connect(this.ctx.destination);
                this.masterGain.gain.value = 0.3; // Default volume
            }
        }
    }

    toggleMute(muted: boolean) {
        this.isMuted = muted;
        if (this.masterGain) {
            this.masterGain.gain.value = muted ? 0 : 0.3;
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 1) {
        if (!this.ctx || !this.masterGain || this.isMuted) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
        
        gain.gain.setValueAtTime(vol, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playSpin() {
        if (!this.ctx || this.isMuted) return;
        // Create a mechanical rolling sound using noise or rapid clicks
        const now = this.ctx.currentTime;
        for(let i = 0; i < 10; i++) {
             this.playTone(100 + Math.random() * 50, 'square', 0.05, i * 0.08, 0.1);
        }
    }

    playStop() {
         // Low thud
         this.playTone(150, 'triangle', 0.1, 0, 0.5);
         this.playTone(80, 'sine', 0.15, 0, 0.5);
    }

    playWin() {
        // Ascending major arpeggio
        const now = 0;
        this.playTone(523.25, 'sine', 0.2, now, 0.3); // C5
        this.playTone(659.25, 'sine', 0.2, now + 0.1, 0.3); // E5
        this.playTone(783.99, 'sine', 0.4, now + 0.2, 0.3); // G5
        this.playTone(1046.50, 'sine', 0.6, now + 0.3, 0.2); // C6
    }

    playJackpot() {
        // Complex fanfare
        const now = 0;
        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51, 1567.98];
        notes.forEach((freq, i) => {
            this.playTone(freq, 'square', 0.1, now + (i * 0.08), 0.15);
        });
        // Siren effect
        if(this.ctx && !this.isMuted && this.masterGain) {
             const osc = this.ctx.createOscillator();
             const gain = this.ctx.createGain();
             osc.type = 'sawtooth';
             osc.frequency.setValueAtTime(400, this.ctx.currentTime);
             osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.5);
             gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
             gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.0);
             osc.connect(gain);
             gain.connect(this.masterGain);
             osc.start();
             osc.stop(this.ctx.currentTime + 1.0);
        }
    }
}

export const SlotGameModal: React.FC<{ onClose: () => void, gameTitle: string }> = ({ onClose, gameTitle }) => {
    const { user, updateBalance } = useAuth();
    
    // Theme Logic
    const isSuperAce = gameTitle === 'Super Ace';

    // Configure Symbols and Payouts based on the game
    const SYMBOLS = isSuperAce 
        ? ['♠️', '♥️', '♣️', '♦️', '🃏', '👑'] // Super Ace Card Theme
        : ['👑', '💎', '7️⃣', '🔔', '🍒', '🍇']; // Default Classic Theme

    const PAYOUTS: { [key: string]: number } = isSuperAce 
        ? { '👑': 100, '🃏': 50, '♠️': 20, '♥️': 15, '♣️': 10, '♦️': 5 }
        : { '👑': 50, '💎': 20, '7️⃣': 10, '🔔': 5, '🍒': 3, '🍇': 2 };

    const initialReels = isSuperAce 
        ? ['🃏', '♠️', '🃏']
        : ['7️⃣', '7️⃣', '7️⃣'];

    const [reels, setReels] = useState(initialReels);
    const [isSpinning, setIsSpinning] = useState(false);
    const [bet, setBet] = useState(10);
    const [winAmount, setWinAmount] = useState(0);
    const [message, setMessage] = useState("Good Luck!");
    const [isMuted, setIsMuted] = useState(false);
    
    // Initialize Audio Controller Ref
    const audioController = useRef<SlotAudioController | null>(null);

    useEffect(() => {
        audioController.current = new SlotAudioController();
        return () => {
            // Cleanup if needed
        };
    }, []);

    const toggleMute = () => {
        const newMuteState = !isMuted;
        setIsMuted(newMuteState);
        audioController.current?.toggleMute(newMuteState);
    };

    const spin = () => {
        if (!user) return;
        if (user.balance < bet) {
            setMessage("Insufficient funds!");
            return;
        }
        if (isSpinning) return;

        // Start Audio Context on user interaction if suspended
        audioController.current?.toggleMute(isMuted);

        setIsSpinning(true);
        setWinAmount(0);
        setMessage("Spinning...");
        
        // Deduct bet immediately
        updateBalance(-bet);
        
        // Play Spin Sound (Looping effect logic handled in interval or single call)
        // Since playSpin plays a short sequence, we can trigger it in the interval if we want continuous,
        // or just once long. Let's trigger short blips in the interval.

        // Spin animation duration
        const spinDuration = 1500;
        let spinTicks = 0;
        
        // Animate reels
        const interval = setInterval(() => {
            setReels([
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
            ]);
            
            // Play mechanical tick every other frame
            if(spinTicks % 4 === 0) {
                 audioController.current?.playSpin();
            }
            spinTicks++;

        }, 50);

        // Stop spin and calculate result
        setTimeout(() => {
            clearInterval(interval);
            
            // Generate final result
            const finalReels = [
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
            ];
            
            setReels(finalReels);
            audioController.current?.playStop(); // Stop sound
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
            audioController.current?.playJackpot();
        } 
        // 2 Match (Any position - simplified)
        else if (r1 === r2 || r2 === r3 || r1 === r3) {
             const symbol = r1 === r2 ? r1 : r3; // Get the matching symbol
             // Ensure the matched symbol exists in PAYOUTS (it should)
             const baseMultiplier = PAYOUTS[symbol] ? (PAYOUTS[symbol] / 5) : 1.5; 
             const win = Math.floor(bet * Math.max(1.5, baseMultiplier));
             
             updateBalance(win);
             setWinAmount(win);
             setMessage(`Nice! Small win: ₱${win}`);
             audioController.current?.playWin();
        } else {
            setMessage("Try again!");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={`relative w-full max-w-lg bg-brand-card border rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden ${isSuperAce ? 'border-yellow-600/50' : 'border-brand-gold/30'}`}>
                
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-card to-[#1a1d24] p-4 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-2">
                        {isSuperAce ? <Club className="w-5 h-5 text-yellow-500" /> : <Coins className="w-5 h-5 text-brand-gold" />}
                        <span className="text-white font-bold font-display">{gameTitle}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Balance Display */}
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                         <span className="text-gray-400 text-xs uppercase tracking-wider">Balance</span>
                         <span className="text-brand-gold font-mono font-bold text-xl">₱{user?.balance.toFixed(2)}</span>
                    </div>

                    {/* Slot Machine Screen */}
                    <div className={`relative bg-[#0a0a0a] p-4 rounded-xl border-[4px] shadow-inner ${isSuperAce ? 'border-yellow-700' : 'border-[#D4AF37]'}`}>
                        {/* Reels Container */}
                        <div className={`flex gap-2 md:gap-4 h-32 md:h-40 rounded-lg overflow-hidden p-2 relative ${isSuperAce ? 'bg-[#1a0505]' : 'bg-white/5'}`}>
                            {/* Win Line */}
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/50 z-10"></div>
                            
                            {reels.map((symbol, i) => (
                                <div key={i} className="flex-1 bg-white/90 rounded-md flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                                    <div className={`text-4xl md:text-6xl transition-all duration-100 ${isSpinning ? 'blur-sm scale-110' : 'scale-100'} ${isSuperAce && (symbol === '♥️' || symbol === '♦️') ? 'text-red-600' : 'text-black'}`}>
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
