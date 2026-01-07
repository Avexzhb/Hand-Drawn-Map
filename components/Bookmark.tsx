import React from 'react';

interface BookmarkProps {
  side?: 'left' | 'right';
  text?: string;
  onClick?: () => void;
}

export const Bookmark: React.FC<BookmarkProps> = ({ 
  side = 'left', 
  text = '手绘城市地图',
  onClick
}) => {
  const isLeft = side === 'left';

  return (
    <div 
      className={`absolute top-16 z-0 h-14 w-[165px] flex items-center pointer-events-none ${
        isLeft ? 'left-0 justify-end' : 'right-0 justify-start'
      }`}
    >
      {/* 
        Container Logic:
        - Position: absolute top-16.
        - Left Side: left-0.
        - Right Side: right-0.
        - Dimensions: h-14 w-[165px].
        
        Change: Removed hover/transition effects. 
        Set static transform to simulate the "slid out" state.
        Using 90% translation ensures the bookmark sticks out visibly while maintaining visual connection to the frame.
      */}
      <div 
        onClick={onClick}
        className={`w-full h-full relative pointer-events-auto transform group cursor-pointer ${
          isLeft 
            ? 'translate-x-[-90%]' 
            : 'translate-x-[90%]'
        }`}
      >
        
        {/* Bookmark Body */}
        <div className={`w-full h-full bg-[#8D1F18] border border-[#FDFBF0]/30 shadow-[4px_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 overflow-hidden relative ${
          isLeft 
            ? 'rounded-l-full rounded-r-none flex-row' 
            : 'rounded-r-full rounded-l-none flex-row-reverse'
        }`}>
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shigley-drops.png')]"></div>

          {/* Hole for Tassel */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3E2723] shadow-inner border border-[#BCAAA4]/20 z-20 ${
            isLeft ? 'left-2.5' : 'right-2.5'
          }`}></div>

          {/* Text Content */}
          <div className={`flex-1 flex items-center justify-center ${isLeft ? 'pl-2' : 'pr-2'}`}>
            <span className="font-calligraphy text-[#FDFBF0] text-lg tracking-[0.15em] drop-shadow-md select-none whitespace-nowrap transition-all duration-300 group-hover:text-[#FDE047] group-hover:drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]">
              {text}
            </span>
          </div>
          
        </div>

        {/* Tassel - Adjusted top to 7 (28px) to match new height center (56px/2) */}
        <div className={`absolute top-7 w-6 h-40 pointer-events-none flex flex-col items-center z-0 ${
          isLeft ? 'left-2.5 -translate-x-1/2' : 'right-2.5 translate-x-1/2'
        }`}>
           {/* String Loop */}
           <div className="w-[1px] h-2 bg-[#F5E6D3] shadow-sm"></div>
           {/* Knot */}
           <div className="w-2.5 h-1.5 bg-[#A1887F] rounded-full shadow-sm relative z-10 border border-[#FDFBF0]/20"></div>
           {/* Main Thread */}
           <div className="w-[1px] h-5 bg-[#8D1F18]"></div>
           {/* Fringe Head */}
           <div className="w-1.5 h-1.5 bg-[#8D1F18] rounded-t-sm mt-[-1px]"></div>
           {/* Fringe */}
           <div className="w-3 h-24 bg-gradient-to-b from-[#8D1F18] to-transparent opacity-90 relative -mt-0.5">
               <svg width="12" height="96" viewBox="0 0 12 96" className="absolute inset-0 overflow-visible">
                  <path d="M1,0 Q-1,25 0,90" stroke="#B71C1C" strokeWidth="1" fill="none" opacity="0.8"/>
                  <path d="M6,0 Q6,35 6,96" stroke="#C62828" strokeWidth="1" fill="none" />
                  <path d="M11,0 Q13,25 12,90" stroke="#B71C1C" strokeWidth="1" fill="none" opacity="0.8"/>
               </svg>
           </div>
        </div>

      </div>
    </div>
  );
};