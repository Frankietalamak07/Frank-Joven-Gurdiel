
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  balance: number;
  isVip: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (email: string, pass: string, username: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModals: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Load session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('tg777_session');
    if (storedSession) {
      try {
        setUser(JSON.parse(storedSession));
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('tg777_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.pass === pass);

    if (foundUser) {
      const sessionUser = { 
        username: foundUser.username, 
        email: foundUser.email, 
        balance: foundUser.balance,
        isVip: foundUser.isVip || false
      };
      setUser(sessionUser);
      localStorage.setItem('tg777_session', JSON.stringify(sessionUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (email: string, pass: string, username: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const users = JSON.parse(localStorage.getItem('tg777_users') || '[]');
    
    // Check if exists
    if (users.find((u: any) => u.email === email)) {
        setIsLoading(false);
        return false;
    }

    const newUser = {
        email,
        pass,
        username,
        balance: 888.00, // Welcome Bonus
        isVip: false,
        joinedAt: new Date().toISOString()
    };

    // --- ZAPIER INTEGRATION START ---
    try {
        // Updated with user provided Webhook URL
        const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/25448359/uzs5ato/"; 
        
        if (ZAPIER_WEBHOOK_URL) {
            // Using 'no-cors' mode ensures the request is sent even if Zapier/Browser strict CORS policies interfere with the response reading.
            // This is standard for client-side fire-and-forget webhooks.
            await fetch(ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // Important: Prevents CORS errors in browser console
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'text/plain' // text/plain avoids preflight OPTIONS request which often fails on simple webhooks
                }
            });
            console.log("Data sent to Zapier:", newUser);
        }
    } catch (error) {
        console.error("Failed to send data to Zapier:", error);
        // We don't stop registration if Zapier fails, we still proceed locally.
    }
    // --- ZAPIER INTEGRATION END ---

    users.push(newUser);
    localStorage.setItem('tg777_users', JSON.stringify(users));
    
    // Auto login
    const sessionUser = { 
        username: newUser.username, 
        email: newUser.email, 
        balance: newUser.balance,
        isVip: false
    };
    setUser(sessionUser);
    localStorage.setItem('tg777_session', JSON.stringify(sessionUser));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tg777_session');
  };

  const updateBalance = (amount: number) => {
    if (!user) return;

    const newBalance = user.balance + amount;
    const updatedUser = { ...user, balance: newBalance };
    
    // Update State
    setUser(updatedUser);
    
    // Update Session Storage
    localStorage.setItem('tg777_session', JSON.stringify(updatedUser));

    // Update "Database" (Users Array)
    const users = JSON.parse(localStorage.getItem('tg777_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex].balance = newBalance;
        localStorage.setItem('tg777_users', JSON.stringify(users));
    }
  };

  const openLogin = () => { setIsRegisterOpen(false); setIsLoginOpen(true); };
  const openRegister = () => { setIsLoginOpen(false); setIsRegisterOpen(true); };
  const closeModals = () => { setIsLoginOpen(false); setIsRegisterOpen(false); };

  return (
    <AuthContext.Provider value={{ 
        user, isLoading, login, register, logout, updateBalance,
        isLoginOpen, isRegisterOpen, openLogin, openRegister, closeModals 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
