import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Zap, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/format';
import { ShoeVisual } from './ShoeVisual';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, quantity: number) => void;
  onBuyNow: (product: Product, size: number, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showSuccessAdded, setShowSuccessAdded] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      // Pick first size that has stock
      const firstAvailable = product.sizes.find(s => s.stock > 0);
      setSelectedSize(firstAvailable ? firstAvailable.size : null);
      setQuantity(1);
      setErrorMsg('');
      setShowSuccessAdded(false);
    }
  }, [product]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentSizeObj = product.sizes.find(s => s.size === selectedSize);
  const maxStock = currentSizeObj ? currentSizeObj.stock : 0;
  const isSelectedOutOfStock = maxStock === 0;

  const validateSelection = (): boolean => {
    if (!selectedSize) {
      setErrorMsg('Vui lòng chọn kích cỡ giày (Size) trước khi tiếp tục.');
      return false;
    }
    if (isSelectedOutOfStock) {
      setErrorMsg(`Size ${selectedSize} hiện đã hết hàng, vui lòng chọn size khác.`);
      return false;
    }
    if (quantity < 1 || quantity > maxStock) {
      setErrorMsg(`Số lượng không hợp lệ (Tối đa còn ${maxStock} đôi size ${selectedSize}).`);
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection() || !selectedSize) return;
    onAddToCart(product, selectedSize, quantity);
    setShowSuccessAdded(true);
    setTimeout(() => setShowSuccessAdded(false), 2200);
  };

  const handleBuyNow = () => {
    if (!validateSelection() || !selectedSize) return;
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#151515]/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#F7F7F2] hover:bg-black/10 text-[#151515] rounded-full transition-colors cursor-pointer"
          aria-label="Đóng cửa sổ chi tiết"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: IMAGE & GALLERY */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="w-full aspect-[4/3] bg-[#F7F7F2] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden border border-[#151515]/5">
                <ShoeVisual product={product} />
              </div>

              {/* Colorway & Tag */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#666660]">
                <span>Màu sắc: <strong className="text-[#151515]">{product.colorScheme.label}</strong></span>
                <span>Trọng lượng: <strong className="text-[#151515]">{product.specs.weight}</strong></span>
              </div>

              {/* Technical Specifications */}
              <div className="mt-6 pt-5 border-t border-[#151515]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515] mb-3">
                  Thông Số Kỹ Thuật
                </h4>
                <dl className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#F7F7F2] p-2.5 rounded-xl">
                    <dt className="text-[#666660]">Thân giày (Upper)</dt>
                    <dd className="font-semibold text-[#151515] mt-0.5">{product.specs.upper}</dd>
                  </div>
                  <div className="bg-[#F7F7F2] p-2.5 rounded-xl">
                    <dt className="text-[#666660]">Đế giữa (Midsole)</dt>
                    <dd className="font-semibold text-[#151515] mt-0.5">{product.specs.midsole}</dd>
                  </div>
                  <div className="bg-[#F7F7F2] p-2.5 rounded-xl">
                    <dt className="text-[#666660]">Đế ngoài (Outsole)</dt>
                    <dd className="font-semibold text-[#151515] mt-0.5">{product.specs.outsole}</dd>
                  </div>
                  <div className="bg-[#F7F7F2] p-2.5 rounded-xl">
                    <dt className="text-[#666660]">Mặt sân đề xuất</dt>
                    <dd className="font-semibold text-[#151515] mt-0.5">{product.specs.courtType}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* RIGHT: BUY MODULE & DETAILS */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Category & Badge */}
              <div className="flex items-center gap-2 text-xs text-[#666660] mb-2">
                <span className="font-bold uppercase tracking-widest text-[#151515]">
                  {product.categoryLabelVi}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.subTypeVi}</span>
              </div>

              {/* Product Title */}
              <h2 id="modal-product-title" className="font-display text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-2xl sm:text-3xl font-black text-[#151515] tabular-nums">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#666660] line-through tabular-nums">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#666660] leading-relaxed">
                {product.description}
              </p>

              {/* Highlight Features */}
              <div className="mt-4 space-y-1.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#151515]">
                    <Check className="w-3.5 h-3.5 text-[#151515] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* SIZE SELECTION */}
              <div className="mt-6 pt-6 border-t border-[#151515]/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-[#151515] uppercase tracking-wider">
                    Chọn Kích Cỡ Giày (EU) <span className="text-red-500">*</span>
                  </span>
                  {selectedSize && (
                    <span className="text-xs text-[#666660]">
                      {isSelectedOutOfStock ? (
                        <span className="text-red-500 font-semibold">Tạm hết size này</span>
                      ) : (
                        <span>Còn lại {maxStock} đôi</span>
                      )}
                    </span>
                  )}
                </div>

                {/* Sizes grid */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {product.sizes.map((s) => {
                    const isOutOfStock = s.stock === 0;
                    const isSelected = selectedSize === s.size;

                    return (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(s.size);
                          setErrorMsg('');
                          if (quantity > s.stock) setQuantity(Math.max(1, s.stock));
                        }}
                        disabled={isOutOfStock}
                        className={`h-11 rounded-xl text-xs font-bold transition-all relative flex flex-col items-center justify-center cursor-pointer ${
                          isOutOfStock
                            ? 'bg-gray-100 text-gray-300 border border-dashed border-gray-300 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#151515] text-[#C7F464] ring-2 ring-[#151515] shadow-sm'
                            : 'bg-[#F7F7F2] text-[#151515] hover:bg-black/10 border border-[#151515]/10'
                        }`}
                      >
                        <span>{s.size}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUANTITY SELECTION */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#151515] uppercase tracking-wider">
                  Số Lượng
                </span>

                <div className="flex items-center border border-[#151515]/20 rounded-xl bg-[#F7F7F2] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[#151515] hover:bg-white disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold tabular-nums text-[#151515]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
                    disabled={quantity >= maxStock || isSelectedOutOfStock}
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[#151515] hover:bg-white disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Added to cart confirmation */}
              {showSuccessAdded && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã thêm đôi size {selectedSize} (SL: {quantity}) vào giỏ hàng!</span>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isSelectedOutOfStock}
                  className="py-3.5 px-4 rounded-xl border border-[#151515] hover:bg-black/5 text-[#151515] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isSelectedOutOfStock}
                  className="py-3.5 px-4 rounded-xl bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Mua Ngay</span>
                </button>
              </div>

              {/* Policy note */}
              <div className="mt-5 flex items-center justify-between text-[11px] text-[#666660]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#151515]" />
                  Đổi size miễn phí trong 7 ngày
                </span>
                <span>Giao hàng toàn quốc 2-3 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
