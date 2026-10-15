import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const content = 'CẦU LÔNG • TENNIS • CHẠY BỘ • CHẠM NHỊP CHUYỂN ĐỘNG • TEAMY • ';
  // Repeat content to ensure continuous looping without stutter
  const repeated = Array(6).fill(content).join(' ');

  return (
    <div className="w-full bg-[#151515] text-[#F7F7F2] py-2.5 sm:py-3 overflow-hidden select-none border-y border-[#151515]">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="font-display font-bold text-xs sm:text-sm tracking-widest uppercase text-[#F7F7F2]/90 hover:text-[#C7F464] transition-colors">
          {repeated}
        </span>
        <span className="font-display font-bold text-xs sm:text-sm tracking-widest uppercase text-[#F7F7F2]/90 hover:text-[#C7F464] transition-colors" aria-hidden="true">
          {repeated}
        </span>
      </div>
    </div>
  );
};
