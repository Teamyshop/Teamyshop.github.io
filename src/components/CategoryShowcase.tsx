import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SportCategory, Product } from '../types';
import { ShoeVisual } from './ShoeVisual';

interface CategoryShowcaseProps {
  onSelectCategory: (category: SportCategory) => void;
  products: Product[];
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  products
}) => {
  const badmintonSample = products.find(p => p.id === 'tmy-bl-01') || products[0];
  const tennisSample = products.find(p => p.id === 'tmy-tn-01') || products[4];
  const runningSample = products.find(p => p.id === 'tmy-rn-01') || products[8];

  const categories = [
    {
      id: 'badminton' as SportCategory,
      title: 'Giày Cầu Lông',
      tagline: 'Nhanh một nhịp. Vững một bước.',
      description: 'Đế kép bám sàn non-marking, bảo vệ mắt cá chân trong từng pha đổi hướng và bật nhảy đập cầu uy lực.',
      badge: '4 DÒNG CHUYÊN DỤNG',
      sample: badmintonSample,
      bgClass: 'bg-white'
    },
    {
      id: 'tennis' as SportCategory,
      title: 'Giày Tennis',
      tagline: 'Làm chủ từng pha bóng.',
      description: 'Khung nẹp sườn Lateral Wing chịu lực xoắn cực đại, hỗ trợ các pha trượt dừng gắt vạch baseline.',
      badge: 'ALL-COURT & CLAY',
      sample: tennisSample,
      bgClass: 'bg-[#1E293B] text-white'
    },
    {
      id: 'running' as SportCategory,
      title: 'Giày Chạy Bộ',
      tagline: 'Đi xa hơn giới hạn.',
      description: 'Đệm bọt khí động học thế hệ mới, từ bài chạy dưỡng sinh 5K mỗi sáng đến tấm carbon marathon 42K.',
      badge: 'DAILY & RACING CARBON',
      sample: runningSample,
      bgClass: 'bg-white'
    }
  ];

  const handleCardClick = (cat: SportCategory) => {
    onSelectCategory(cat);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#666660]">
            BỘ MÔN THỂ THAO CHÍNH
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight mt-1">
            Thiết kế chuyên sâu cho từng mặt sân
          </h2>
        </div>
        <p className="text-sm text-[#666660] max-w-md">
          Mỗi bộ môn đòi hỏi một đặc tính cơ học riêng biệt. Chọn đúng dòng giày để tối ưu hiệu suất và bảo vệ cơ thể.
        </p>
      </div>

      {/* 3 Large Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((cat) => {
          const isDark = cat.bgClass.includes('bg-[#1E293B]');

          return (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#151515]/10 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden ${cat.bgClass}`}
            >
              {/* Header inside card */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold tracking-wider uppercase ${isDark ? 'text-[#C7F464]' : 'text-[#666660]'}`}>
                    {cat.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-45 ${
                    isDark ? 'bg-white/10 text-[#C7F464]' : 'bg-[#151515] text-[#C7F464]'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className={`font-display text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#151515]'}`}>
                  {cat.title}
                </h3>
                <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-[#C7F464]' : 'text-[#151515]'}`}>
                  “{cat.tagline}”
                </p>
              </div>

              {/* Shoe visual preview */}
              <div className="my-6 relative py-2">
                <ShoeVisual product={cat.sample} />
              </div>

              {/* Footer inside card */}
              <div className="relative z-10 pt-4 border-t border-black/10">
                <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${isDark ? 'text-slate-300' : 'text-[#666660]'}`}>
                  {cat.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#151515]'}`}>
                    Khám phá dòng này
                  </span>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#666660]'}`}>
                    4 mẫu &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
