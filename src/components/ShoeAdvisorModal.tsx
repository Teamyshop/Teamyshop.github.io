import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Product, SportCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { formatVND } from '../utils/format';
import { ShoeVisual } from './ShoeVisual';

interface ShoeAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ShoeAdvisorModal: React.FC<ShoeAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [selectedSport, setSelectedSport] = useState<SportCategory>('badminton');
  const [selectedNeed, setSelectedNeed] = useState<string>('speed');

  if (!isOpen) return null;

  const sportOptions = [
    { id: 'badminton' as SportCategory, label: 'Cầu Lông', desc: 'Di chuyển bước chéo & bật smash' },
    { id: 'tennis' as SportCategory, label: 'Tennis', desc: 'Trượt baseline & phanh gấp' },
    { id: 'running' as SportCategory, label: 'Chạy Bộ', desc: 'Chạy đường trường & bảo vệ gối' }
  ];

  // Needs per sport
  const needOptions: Record<SportCategory, { id: string; label: string; desc: string; targetId: string }[]> = {
    badminton: [
      { id: 'speed', label: 'Tốc độ & Cứu cầu linh hoạt', desc: 'Siêu nhẹ, bám sân thảm', targetId: 'tmy-bl-01' },
      { id: 'power', label: 'Bật nhảy đập cầu uy lực', desc: 'Đệm carbon bật nhún', targetId: 'tmy-bl-02' },
      { id: 'ankle', label: 'Bảo vệ cổ chân tối đa', desc: 'Cổ đệm ôm chống lật sơ mi', targetId: 'tmy-bl-04' }
    ],
    tennis: [
      { id: 'allcourt', label: 'Bao sân toàn diện (All-Court)', desc: 'Chống mài mòn, nẹp ổn định', targetId: 'tmy-tn-01' },
      { id: 'slide', label: 'Trượt vạch cuối sân bền bỉ', desc: 'Gia cố mũi DragGuard 4 lớp', targetId: 'tmy-tn-02' },
      { id: 'clay', label: 'Chuyên sân đất nện (Clay)', desc: 'Vân xương cá Chevron sâu', targetId: 'tmy-tn-03' }
    ],
    running: [
      { id: 'daily', label: 'Chạy hằng ngày (5K - 10K)', desc: 'Đệm xốp êm ái, thoáng mát', targetId: 'tmy-rn-01' },
      { id: 'marathon', label: 'Đua cự ly Marathon (21K - 42K)', desc: 'Tấm carbon plate trợ lực 87%', targetId: 'tmy-rn-02' },
      { id: 'cushion', label: 'Người mới tập / Bảo vệ gối', desc: 'Đế dày 36mm chống chấn động', targetId: 'tmy-rn-03' }
    ]
  };

  const currentNeeds = needOptions[selectedSport];
  const activeNeed = currentNeeds.find(n => n.id === selectedNeed) || currentNeeds[0];
  const recommendedShoe = PRODUCTS.find(p => p.id === activeNeed.targetId) || PRODUCTS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="advisor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#151515]/10 overflow-hidden my-auto p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#666660] hover:text-[#151515] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#151515] mb-1">
          <Sparkles className="w-4 h-4 text-[#C7F464]" />
          <span>TEAMY SHOE ADVISOR</span>
        </div>

        <h2 id="advisor-title" className="font-display text-2xl font-black text-[#151515]">
          Tìm Đôi Giày Chuẩn Xác Cho Bạn
        </h2>
        <p className="text-xs text-[#666660] mt-1 mb-6">
          Chọn bộ môn và thói quen vận động để Teamy đề xuất mẫu giày phù hợp nhất.
        </p>

        {/* Step 1: Choose Sport */}
        <div className="mb-5">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
            1. Bạn Chơi Môn Thể Thao Nào?
          </span>
          <div className="grid grid-cols-3 gap-2.5">
            {sportOptions.map((sport) => {
              const isSelected = selectedSport === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => {
                    setSelectedSport(sport.id);
                    setSelectedNeed(needOptions[sport.id][0].id);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#151515] bg-[#151515] text-[#C7F464] shadow-sm'
                      : 'border-[#151515]/15 hover:border-[#151515]/40 bg-white text-[#151515]'
                  }`}
                >
                  <p className="font-display font-bold text-sm">{sport.label}</p>
                  <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-[#F7F7F2]/80' : 'text-[#666660]'}`}>
                    {sport.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Needs */}
        <div className="mb-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
            2. Nhu Cầu Ưu Tiên Của Bạn Là Gì?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {currentNeeds.map((need) => {
              const isSelected = selectedNeed === need.id;
              return (
                <button
                  key={need.id}
                  onClick={() => setSelectedNeed(need.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#151515] bg-[#F7F7F2] ring-2 ring-[#151515]'
                      : 'border-[#151515]/15 hover:border-[#151515]/30 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-[#151515]">{need.label}</p>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#151515]" />}
                  </div>
                  <p className="text-[11px] text-[#666660] mt-1">{need.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="bg-[#F7F7F2] border border-[#151515]/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-28 h-24 rounded-xl bg-white p-2 shrink-0 flex items-center justify-center border border-[#151515]/5">
            <ShoeVisual product={recommendedShoe} />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-[#666660]">
              <span className="font-bold text-[#151515] uppercase">{recommendedShoe.categoryLabelVi}</span>
              <span>·</span>
              <span>Đề xuất tối ưu</span>
            </div>
            <h4 className="font-display text-lg font-extrabold text-[#151515]">
              {recommendedShoe.name}
            </h4>
            <p className="text-xs text-[#666660] line-clamp-1 mt-0.5">
              {recommendedShoe.tagline}
            </p>
            <div className="mt-2 font-display font-black text-sm text-[#151515] tabular-nums">
              {formatVND(recommendedShoe.price)}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectProduct(recommendedShoe);
            }}
            className="w-full sm:w-auto px-5 py-3 bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            <span>Xem Đôi Này</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
