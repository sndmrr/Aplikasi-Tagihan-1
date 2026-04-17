import React from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AnimatedLogo = ({ size = 'md', className = '' }: AnimatedLogoProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`${className} flex items-center gap-2`}>
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-lg">ST</span>
      </div>
      <span className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent`}>
        Sistem Tagihan Digital
      </span>
    </div>
  );
};
