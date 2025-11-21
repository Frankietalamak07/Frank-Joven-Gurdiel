import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  onClick, 
  href,
  className = ''
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-bold font-display uppercase tracking-widest transition-all duration-300 rounded-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#BF953F] via-[#FDF5A6] to-[#B38728] text-black shadow-[0_4px_20px_rgba(191,149,63,0.3)] hover:shadow-[0_4px_30px_rgba(191,149,63,0.5)] hover:scale-[1.02] border border-white/20",
    outline: "bg-transparent border border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold hover:text-white backdrop-blur-sm",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const combinedClasses = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};