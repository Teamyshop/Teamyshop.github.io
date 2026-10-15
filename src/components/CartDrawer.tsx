import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../utils/format';
import { SHIPPING_POLICY } from '../data/products';
import { ShoeVisual } from './ShoeVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, newQty: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= SHIPPING_POLICY.freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : SHIPPING_POLICY.flatRate);
  const total = subtotal + shippingFee;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Giỏ hàng của bạn"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#151515]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#151515]" />
            <h2 className="font-display text-lg font-bold text-[#151515]">
              Giỏ Hàng Của Bạn ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#666660] hover:text-[#151515] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Ribbon */}
        <div className="bg-[#F7F7F2] px-5 py-3 border-b border-[#151515]/10 text-xs text-[#151515]">
          {isFreeShipping ? (
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đơn hàng đã đủ điều kiện <strong>MIỄN PHÍ VẬN CHUYỂN</strong> toàn quốc!</span>
            </div>
          ) : (
            <div>
              <span>
                Thêm <strong>{formatVND(SHIPPING_POLICY.freeShippingThreshold - subtotal)}</strong> để được Miễn phí giao hàng.
              </span>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#151515] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / SHIPPING_POLICY.freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#151515]/10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F7F7F2] flex items-center justify-center text-[#666660] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-display text-base font-bold text-[#151515]">
                Giỏ hàng của bạn đang trống
              </h3>
              <p className="text-xs text-[#666660] max-w-xs mt-1 mb-6">
                Chưa có sản phẩm nào được chọn. Hãy khám phá bộ sưu tập giày thể thao của Teamy!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#151515] text-[#C7F464] text-xs font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          ) : (
            items.map((item) => {
              const lineTotal = item.product.price * item.quantity;
              const sizeObj = item.product.sizes.find(s => s.size === item.size);
              const maxStock = sizeObj ? sizeObj.stock : 10;

              return (
                <div key={`${item.product.id}-${item.size}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-[#F7F7F2] p-2 flex items-center justify-center shrink-0 border border-[#151515]/5">
                    <ShoeVisual product={item.product} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-bold text-[#151515] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-[#666660] hover:text-red-600 transition-colors p-1"
                          aria-label={`Xóa ${item.product.name} size ${item.size}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#666660] mt-1">
                        <span className="font-semibold text-[#151515] bg-[#F7F7F2] px-2 py-0.5 rounded-md">
                          Size: {item.size}
                        </span>
                        <span>Đơn giá: {formatVND(item.product.price)}</span>
                      </div>
                    </div>

                    {/* Stepper & Line Total */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#151515]/20 rounded-lg bg-[#F7F7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#151515] hover:bg-white rounded-l-lg cursor-pointer"
                          aria-label="Giảm số lượng"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums text-[#151515]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                          disabled={item.quantity >= maxStock}
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#151515] hover:bg-white rounded-r-lg disabled:opacity-30 cursor-pointer"
                          aria-label="Tăng số lượng"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-display text-sm font-bold text-[#151515] tabular-nums">
                        {formatVND(lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 bg-[#F7F7F2] border-t border-[#151515]/10 space-y-3">
            <div className="space-y-1.5 text-xs text-[#666660]">
              <div className="flex justify-between">
                <span>Tạm tính ({items.reduce((acc, i) => acc + i.quantity, 0)} đôi):</span>
                <span className="font-medium text-[#151515] tabular-nums">{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-medium text-[#151515] tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">Miễn phí</span>
                  ) : (
                    formatVND(shippingFee)
                  )}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#151515]/10 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#151515]">Tổng cộng:</span>
              <span className="font-display text-xl font-black text-[#151515] tabular-nums">
                {formatVND(total)}
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#666660]">
              Kiểm tra thông tin người nhận và hình thức thanh toán ở bước kế tiếp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
