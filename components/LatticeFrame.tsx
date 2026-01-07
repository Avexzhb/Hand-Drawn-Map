import React from 'react';

interface LatticeFrameProps {
  children: React.ReactNode;
  className?: string;
}

const CornerDecoration: React.FC<{ className?: string, rotate?: number }> = ({ className, rotate = 0 }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute w-16 h-16 pointer-events-none text-[#5D4037] ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path 
      d="M5,5 L95,5 L95,15 L15,15 L15,95 L5,95 Z" 
      fill="currentColor" 
    />
    <path 
      d="M25,25 L75,25 L75,30 L30,30 L30,75 L25,75 Z" 
      fill="currentColor" 
      opacity="0.8"
    />
    <rect x="10" y="10" width="10" height="10" fill="currentColor" />
  </svg>
);

export const LatticeFrame: React.FC<LatticeFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-6 sm:p-10 flex flex-col ${className}`}>
      {/* Outer Border Structure */}
      <div className="absolute inset-0 border-4 border-[#5D4037] bg-[#FDFBF0] shadow-2xl pointer-events-none"></div>
      
      {/* Inner Border Structure */}
      <div className="absolute inset-2 border-2 border-[#8D6E63] border-dashed pointer-events-none"></div>
      
      {/* Corner Decorations */}
      <CornerDecoration className="top-0 left-0" rotate={0} />
      <CornerDecoration className="top-0 right-0" rotate={90} />
      <CornerDecoration className="bottom-0 right-0" rotate={180} />
      <CornerDecoration className="bottom-0 left-0" rotate={270} />

      {/* Content Container */}
      {/* Using flex-1 to ensure it fills the available vertical space defined by the parent's min-height */}
      <div className="relative w-full flex-1 bg-[#fdfbf7] flex items-center justify-center overflow-hidden border border-[#D7CCC8] shadow-inner z-10">
         {children}
      </div>
    </div>
  );
};
