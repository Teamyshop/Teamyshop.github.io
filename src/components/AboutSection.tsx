import React, { useState } from 'react';
import { Target, Compass, Sparkles, Shield, Ruler, ChevronDown, ChevronUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <section id="about-teamy" className="py-16 bg-[#151515] text-[#F7F7F2] relative overflow-hidden">
      {/* Background kinetic pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(#C7F464 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C7F464] mb-3">
            <span>TRIẾT LÝ THƯƠNG HIỆU</span>
            <span aria-hidden="true">·</span>
            <span>CHẠM NHỊP CHUYỂN ĐỘNG</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Sinh ra từ đam mê thể thao thuần khiết.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F7F7F2]/70 leading-relaxed">
            Teamy tin rằng một đôi giày tốt không đơn thuần là trang bị, mà là cầu nối giữa ý chí và từng chuyển động của bạn. Dù là cú bật nhảy smash trên sân cầu, pha trượt gắt nơi vạch baseline tennis hay những cây số marathon bền bỉ, Teamy luôn đồng hành cùng nhịp tim thể thao của bạn.
          </p>
        </div>

        {/* 3 Core Values (Ba giá trị cốt lõi) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-[#1E1E1E] border border-white/10 rounded-3xl p-6 sm:p-7 relative group hover:border-[#C7F464]/50 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#C7F464] mb-5">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">
              1. Chuyên Biệt Từng Mặt Sân
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F7F2]/65 leading-relaxed">
              Không có đôi giày nào dành cho tất cả. Đế non-marking cho sân cầu lông PVC, rãnh xương cá chống mài mòn cho tennis và đĩa carbon trợ lực cho chạy bộ.
            </p>
          </div>

          <div className="bg-[#1E1E1E] border border-white/10 rounded-3xl p-6 sm:p-7 relative group hover:border-[#C7F464]/50 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#C7F464] mb-5">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">
              2. Dễ Lựa Chọn & Minh Bạch
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F7F2]/65 leading-relaxed">
              Thông số vật liệu, độ cứng và trọng lượng được công khai chi tiết. Bộ công cụ Shoe Advisor thông minh giúp bạn chọn đúng đôi giày chỉ sau 2 câu hỏi.
            </p>
          </div>

          <div className="bg-[#1E1E1E] border border-white/10 rounded-3xl p-6 sm:p-7 relative group hover:border-[#C7F464]/50 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#C7F464] mb-5">
              <Sparkles className="w-10 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">
              3. Mua Sắm Rõ Ràng & Tin Cậy
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F7F2]/65 leading-relaxed">
              Không phí ẩn, không quảng cáo giật gân. Quy tắc giao hàng miễn phí đơn giản, hỗ trợ COD tận nhà và chính sách đổi size miễn phí trong 7 ngày.
            </p>
          </div>
        </div>

        {/* Interactive Size Chart Toggle */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#C7F464]" />
              <span>Bảng Hướng Dẫn Đo Kích Thước Bàn Chân Chuẩn (EU Size Chart)</span>
            </span>
            {showSizeGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showSizeGuide && (
            <div className="mt-4 p-5 bg-[#1E1E1E] rounded-2xl border border-white/10 overflow-x-auto animate-in fade-in">
              <p className="text-xs text-[#F7F7F2]/70 mb-3">
                Đặt gót chân sát tường, đo chiều dài từ gót đến ngón dài nhất để chọn size chính xác:
              </p>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#C7F464]">
                    <th className="py-2 px-3">Size EU</th>
                    <th className="py-2 px-3">38</th>
                    <th className="py-2 px-3">39</th>
                    <th className="py-2 px-3">40</th>
                    <th className="py-2 px-3">41</th>
                    <th className="py-2 px-3">42</th>
                    <th className="py-2 px-3">43</th>
                    <th className="py-2 px-3">44</th>
                    <th className="py-2 px-3">45</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#F7F7F2]/80">
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Chiều dài chân (cm)</td>
                    <td className="py-2 px-3">24.0</td>
                    <td className="py-2 px-3">24.5</td>
                    <td className="py-2 px-3">25.0</td>
                    <td className="py-2 px-3">25.5</td>
                    <td className="py-2 px-3">26.0</td>
                    <td className="py-2 px-3">26.5</td>
                    <td className="py-2 px-3">27.0</td>
                    <td className="py-2 px-3">27.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
