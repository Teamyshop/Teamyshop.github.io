import React, { useState, useEffect } from 'react';
import { ShoppingBag, FileSpreadsheet, Menu, X, Search, ShieldCheck } from 'lucide-react';
import { SportCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenDocs: () => void;
  onOpenSheetsConfig: () => void;
  onSelectCategory: (category: SportCategory | 'all') => void;
  activeCategory: SportCategory | 'all';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSheetsConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenDocs,
  onOpenSheetsConfig,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
  isSheetsConnected
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (cat: SportCategory | 'all', targetId?: string) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F7F2]/95 backdrop-blur-md shadow-xs border-b border-[#151515]/10 py-3'
          : 'bg-[#F7F7F2] py-4 md:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* ZONE 1: BRAND LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('all', 'hero')}
              className="group flex items-center gap-2.5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#151515]"
              aria-label="Về trang chủ Teamy"
            >
              {/* Dynamic athletic motion SVG mark */}
              <div className="w-9 h-9 rounded-lg bg-[#151515] flex items-center justify-center text-[#C7F464] transition-transform duration-200 group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20L15 11H10V19H6V11H4V6Z" fill="#C7F464" />
                  <circle cx="18" cy="17" r="2.5" fill="#C7F464" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#151515] leading-none">
                  TEAMY
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#666660] mt-0.5">
                  Sport Shoes
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: NAVIGATION LINKS (Single-line, unboxed, hover underline) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#151515]/80">
            <button
              onClick={() => handleNavClick('all', 'hero')}
              className="hover:text-[#151515] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Trang Chủ
            </button>
            <button
              onClick={() => handleNavClick('all', 'products-section')}
              className={`hover:text-[#151515] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all' ? 'text-[#151515] font-semibold' : ''
              }`}
            >
              Tất Cả Giày
            </button>
            <button
              onClick={() => handleNavClick('badminton', 'products-section')}
              className={`hover:text-[#151515] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'badminton' ? 'text-[#151515] font-semibold' : ''
              }`}
            >
              Cầu Lông
            </button>
            <button
              onClick={() => handleNavClick('tennis', 'products-section')}
              className={`hover:text-[#151515] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'tennis' ? 'text-[#151515] font-semibold' : ''
              }`}
            >
              Tennis
            </button>
            <button
              onClick={() => handleNavClick('running', 'products-section')}
              className={`hover:text-[#151515] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'running' ? 'text-[#151515] font-semibold' : ''
              }`}
            >
              Chạy Bộ
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('about-teamy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#151515] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Về Teamy
            </button>
          </nav>

          {/* ZONE 3: ACTIONS (Search, Sheets Connect/Docs, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Inline search or search toggle */}
            <div className="relative flex items-center">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-[#151515]/20 rounded-full pl-3 pr-2 py-1 shadow-xs animate-in fade-in duration-200">
                  <Search className="w-3.5 h-3.5 text-[#666660] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tìm tên, môn đấu..."
                    className="w-32 sm:w-44 text-xs bg-transparent text-[#151515] placeholder-[#666660] focus:outline-hidden"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange('');
                    }}
                    className="text-[#666660] hover:text-[#151515] ml-1 p-0.5 rounded-full"
                    aria-label="Đóng tìm kiếm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-[#151515] hover:bg-[#151515]/5 rounded-full transition-colors cursor-pointer"
                  aria-label="Tìm kiếm sản phẩm"
                  title="Tìm kiếm sản phẩm"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Sheets connection status badge & button */}
            <button
              onClick={onOpenSheetsConfig}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                isSheetsConnected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title="Cấu hình Google Sheets để lưu đơn"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{isSheetsConnected ? 'Sheets: Sẵn Sàng' : 'Sheets: Chế Độ Demo'}</span>
            </button>

            {/* Tài liệu & Flowchart Thuyết minh */}
            <button
              onClick={onOpenDocs}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#151515]/5 hover:bg-[#151515]/10 text-[#151515] transition-colors cursor-pointer"
              title="Xem Flowchart quy trình & Thuyết minh đề tài"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#151515]" />
              <span>Tài Liệu Đề Bài</span>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 bg-[#151515] text-white rounded-full hover:bg-[#252525] transition-transform active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C7F464] cursor-pointer"
              aria-label={`Mở giỏ hàng (${cartCount} sản phẩm)`}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 bg-[#C7F464] text-[#151515] text-[11px] font-bold rounded-full border-2 border-[#F7F7F2] shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#151515] hover:bg-[#151515]/5 rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#151515]/10 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 pb-3">
              <button
                onClick={() => handleNavClick('all', 'hero')}
                className="text-left px-3 py-2 text-sm font-medium text-[#151515] hover:bg-black/5 rounded-md"
              >
                Trang Chủ
              </button>
              <button
                onClick={() => handleNavClick('all', 'products-section')}
                className="text-left px-3 py-2 text-sm font-medium text-[#151515] hover:bg-black/5 rounded-md"
              >
                Tất Cả Sản Phẩm
              </button>
              <button
                onClick={() => handleNavClick('badminton', 'products-section')}
                className="text-left px-3 py-2 text-sm font-medium text-[#151515] hover:bg-black/5 rounded-md"
              >
                Giày Cầu Lông
              </button>
              <button
                onClick={() => handleNavClick('tennis', 'products-section')}
                className="text-left px-3 py-2 text-sm font-medium text-[#151515] hover:bg-black/5 rounded-md"
              >
                Giày Tennis
              </button>
              <button
                onClick={() => handleNavClick('running', 'products-section')}
                className="text-left px-3 py-2 text-sm font-medium text-[#151515] hover:bg-black/5 rounded-md"
              >
                Giày Chạy Bộ
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('about-teamy');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left px-3 py-2 text-sm font-medium text-[#151515] hover:bg-black/5 rounded-md"
              >
                Về Thương Hiệu Teamy
              </button>

              <div className="pt-2 border-t border-[#151515]/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSheetsConfig();
                  }}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800"
                >
                  <span className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    Cấu Hình Google Sheets
                  </span>
                  <span className="text-[10px] font-bold">{isSheetsConnected ? 'Đã kết nối' : 'Demo'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDocs();
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-[#151515] text-[#C7F464]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Xem Flowchart & Thuyết Minh Đề Bài
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
