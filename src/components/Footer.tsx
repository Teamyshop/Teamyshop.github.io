import React, { useState } from 'react';
import { ShieldCheck, FileSpreadsheet, Heart, CheckCircle2, X } from 'lucide-react';
import { SportCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: SportCategory | 'all') => void;
  onOpenDocs: () => void;
  onOpenSheetsConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenDocs,
  onOpenSheetsConfig
}) => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policies: Record<string, { title: string; content: string[] }> = {
    'returns': {
      title: 'Chính Sách Đổi Size & Trả Hàng (7 Ngày)',
      content: [
        'Hỗ trợ đổi size miễn phí 01 lần trong vòng 07 ngày kể từ ngày nhận hàng.',
        'Sản phẩm đổi chưa qua sử dụng thực tế ngoài trời, còn nguyên tem mác, hộp và phụ kiện đi kèm.',
        'Trường hợp sản phẩm phát hiện lỗi từ nhà sản xuất (bung keo, rách chỉ may), Teamy đổi mới 100% trong 30 ngày.',
        'Quy trình đổi nhanh chóng: Shipper mang size mới đến tận nhà đổi và thu lại đôi cũ cùng lúc.'
      ]
    },
    'warranty': {
      title: 'Chính Sách Bảo Hành Keo & Đế (6 Tháng)',
      content: [
        'Bảo hành 06 tháng đối với các lỗi bong keo đế, nứt gãy khung TPU chịu lực do lỗi kỹ thuật.',
        'Không áp dụng bảo hành với các hao mòn tự nhiên do thi đấu quá mức trên mặt sân xi măng thô ráp.',
        'Sản phẩm được tiếp nhận bảo hành và hoàn trả trong vòng 3-5 ngày làm việc.'
      ]
    },
    'shipping': {
      title: 'Chính Sách Vận Chuyển Toàn Quốc',
      content: [
        'Miễn phí vận chuyển tiêu chuẩn cho tất cả đơn hàng từ 1.500.000 ₫ trên toàn quốc.',
        'Đơn hàng dưới 1.500.000 ₫ áp dụng mức phí đồng giá 30.000 ₫ cho mọi tỉnh thành.',
        'Thời gian giao hàng: Nội thành 24-48 giờ; Các tỉnh thành khác từ 2-4 ngày làm việc.',
        'Khách hàng được quyền kiểm tra hàng (đồng kiểm ngoại quan) trước khi thanh toán tiền mặt cho shipper.'
      ]
    }
  };

  return (
    <footer className="bg-[#121212] text-[#F7F7F2] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white text-[#151515] flex items-center justify-center font-black">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20L15 11H10V19H6V11H4V6Z" fill="#151515" />
                  <circle cx="18" cy="17" r="2.5" fill="#151515" />
                </svg>
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                TEAMY
              </span>
            </div>

            <p className="mt-3 text-xs text-[#F7F7F2]/70 max-w-sm leading-relaxed">
              Thương hiệu giày thể thao chuyên nghiệp: Cầu lông, Tennis và Chạy bộ.
              Thiết kế khí động học, bám sân vượt trội và đồng hành cùng mọi chuyển động của bạn.
            </p>

            {/* Academic Notice */}
            <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-[#F7F7F2]/60">
              <span className="font-bold text-[#C7F464] block mb-0.5">Website mô phỏng phục vụ học tập</span>
              Tất cả sản phẩm và thông tin bán hàng là dữ liệu minh họa cho bài tập môn học. Không giao dịch thương mại thực tế.
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Danh Mục Sản Phẩm
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F7F2]/70">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer"
                >
                  Tất cả bộ sưu tập
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('badminton');
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer"
                >
                  Giày Cầu Lông (4 mẫu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('tennis');
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer"
                >
                  Giày Tennis (4 mẫu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('running');
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer"
                >
                  Giày Chạy Bộ (4 mẫu)
                </button>
              </li>
            </ul>
          </div>

          {/* Real Demo Policies */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F7F2]/70">
              <li>
                <button
                  onClick={() => setActivePolicyModal('returns')}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer text-left"
                >
                  Chính sách đổi size 7 ngày &rarr;
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('warranty')}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer text-left"
                >
                  Bảo hành keo đế 6 tháng &rarr;
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-[#C7F464] transition-colors cursor-pointer text-left"
                >
                  Chính sách giao hàng toàn quốc &rarr;
                </button>
              </li>
              <li className="pt-2 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={onOpenDocs}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#C7F464] hover:underline cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Xem Flowchart & Thuyết Minh</span>
                </button>
                <button
                  onClick={onOpenSheetsConfig}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#C7F464] hover:underline cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Google Sheets</span>
                </button>
              </li>
            </ul>

            <div className="mt-4 text-[11px] text-[#F7F7F2]/50">
              Thông tin liên hệ mẫu: <span className="text-[#F7F7F2]/70">contact@teamy-demo.local</span> (Dữ liệu minh họa bài tập)
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F7F2]/50 gap-4">
          <p>© 2026 Teamy Sport Footwear. Bài tập môn học Xây dựng Website Thương mại Điện tử.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế & Triển khai với</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>chuẩn mực UI/UX chuyên nghiệp</span>
          </p>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicyModal && policies[activePolicyModal] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#1E1E1E] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/15 shadow-2xl relative">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display text-lg font-bold text-[#C7F464] mb-4">
              {policies[activePolicyModal].title}
            </h3>

            <div className="space-y-2.5 text-xs text-white/80">
              {policies[activePolicyModal].content.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7F464] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePolicyModal(null)}
              className="mt-6 w-full py-2.5 bg-white text-[#151515] font-bold text-xs rounded-xl hover:bg-[#C7F464] transition-colors cursor-pointer"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
