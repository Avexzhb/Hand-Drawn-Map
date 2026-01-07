import React from 'react';

export const CloudBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]" style={{ backgroundColor: '#fdfbf7' }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cloudPattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
             {/* Traditional stylized Yunwen (Cloud Pattern) */}
             <g fill="none" stroke="#795548" strokeWidth="1.5" opacity="0.08">
                {/* Main undulating cloud lines */}
                <path d="M0,80 Q40,50 80,80 T160,80" />
                <path d="M0,40 Q40,10 80,40 T160,40" />
                <path d="M0,120 Q40,90 80,120 T160,120" />

                {/* Decorative swirls for cloud detail */}
                <path d="M50,65 Q60,55 70,65" opacity="0.8"/>
                <path d="M110,95 Q100,105 90,95" opacity="0.8"/>
                <circle cx="40" cy="40" r="2" fill="#795548" opacity="0.5" />
                <circle cx="120" cy="120" r="2" fill="#795548" opacity="0.5" />
             </g>
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
            <stop offset="40%" stopColor="#fdfbf7" stopOpacity="0" />
            <stop offset="100%" stopColor="#5D4037" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        
        {/* Fill with pattern */}
        <rect width="100%" height="100%" fill="url(#cloudPattern)" />
        
        {/* Vignette Overlay for depth */}
        <rect width="100%" height="100%" fill="url(#vignette)" />
      </svg>
    </div>
  );
};
