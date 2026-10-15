import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { ShoeVisual } from './ShoeVisual';

interface HeroProps {
  heroProduct: Product;
  onExploreClick: () => void;
  onOpenAdvisor: () => void;
  onQuickView: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroProduct,
  onExploreClick,
  onOpenAdvisor,
  onQuickView
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-4 pb-12 md:py-16 lg:py-20">
      {/* Background kinetic grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(#151515 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO EDITORIAL COPY */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Kicker label (clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#151515] uppercase mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#151515]" />
              <span>TEAMY / MOVE YOUR WAY</span>
              <span aria-hidden="true" className="text-[#666660]">·</span>
              <span className="text-[#666660]">MÙA GIẢI 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151515] tracking-tight leading-[1.08] mb-6 text-balance">
              BỨT PHÁ TỪ <br />
              <span className="relative inline-block">
                TỪNG BƯỚC CHÂN.
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#C7F464] -z-10 transform -rotate-1 rounded-xs" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#666660] max-w-xl leading-relaxed mb-8">
              Từ sân cầu đến đường chạy, tìm đôi giày đồng hành cùng nhịp chuyển động của bạn.
              Đế cao su kép non-marking, khung khóa gót TPU và đệm đàn hồi bứt tốc thế hệ mới.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                onClick={onExploreClick}
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#151515] text-white hover:bg-[#C7F464] hover:text-[#151515] font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>Khám phá bộ sưu tập</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onOpenAdvisor}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-[#151515]/20 hover:border-[#151515] text-[#151515] font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#151515]" />
                <span>Chọn giày phù hợp</span>
              </button>
            </div>

            {/* Trust points adjacent to CTAs */}
            <div className="mt-8 pt-6 border-t border-[#151515]/10 grid grid-cols-3 gap-4 w-full max-w-lg text-xs text-[#666660]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#151515] shrink-0" />
                <span>3 Môn thi đấu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#151515] shrink-0" />
                <span>100% Đế bám sân</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#151515] shrink-0" />
                <span>Đổi size 7 ngày</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HERO PRODUCT SHOWCASE */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background Oversized TEAMY Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06]">
              <span className="font-display text-[120px] sm:text-[180px] lg:text-[220px] font-black tracking-tighter text-[#151515]">
                TEAMY
              </span>
            </div>

            {/* Radial glow backdrop */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#C7F464]/30 filter blur-3xl -z-10" />

            {/* Interactive Shoe Card container */}
            <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-xs border border-[#151515]/10 rounded-3xl p-6 sm:p-8 shadow-lg shadow-black/5">
              {/* Product floating tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#666660]">
                    Tâm Điểm Mùa Đấu
                  </span>
                  <span className="text-base font-bold text-[#151515]">
                    {heroProduct.name}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-[#151515] text-[#C7F464] text-xs font-bold rounded-lg tabular-nums">
                  {heroProduct.price.toLocaleString('vi-VN')} ₫
                </span>
              </div>

              {/* Shoe Vector Presentation */}
              <div className="relative py-4 cursor-pointer" onClick={() => onQuickView(heroProduct)}>
                <ShoeVisual product={heroProduct} isHero={true} />
              </div>

              {/* Spec strip */}
              <div className="mt-4 pt-4 border-t border-[#151515]/10 flex items-center justify-between text-xs text-[#666660]">
                <div>
                  <span className="font-medium text-[#151515]">Mặt sân:</span> {heroProduct.specs.courtType.split('/')[0]}
                </div>
                <div>
                  <span className="font-medium text-[#151515]">Trọng lượng:</span> {heroProduct.specs.weight.split(' ')[0]}
                </div>
                <button
                  onClick={() => onQuickView(heroProduct)}
                  className="font-bold text-[#151515] hover:text-black underline underline-offset-4 cursor-pointer"
                >
                  Chi tiết &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
