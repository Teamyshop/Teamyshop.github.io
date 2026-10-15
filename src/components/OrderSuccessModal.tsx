import React from 'react';
import { Check, ShoppingBag, Copy, CheckCheck, FileSpreadsheet } from 'lucide-react';
import { OrderPayload } from '../types';
import { formatVND } from '../utils/format';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderPayload | null;
  isDemo: boolean;
  onContinueShopping: () => void;
  onOpenDocs: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  order,
  isDemo,
  onContinueShopping,
  onOpenDocs
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !order) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#151515]/10 overflow-hidden my-auto p-6 sm:p-8 flex flex-col items-center text-center">
        {/* Animated Checkmark Circle */}
        <div className="w-16 h-16 rounded-full bg-[#151515] text-[#C7F464] flex items-center justify-center mb-4 ring-8 ring-[#C7F464]/30 animate-in zoom-in duration-300">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Status Pill */}
        <div className="mb-2">
          {isDemo ? (
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              Đơn mô phỏng đã lưu (Chế độ Demo bài tập)
            </span>
          ) : (
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              Đã ghi nhận trực tiếp vào Google Sheet
            </span>
          )}
        </div>

        {/* Title */}
        <h2 id="success-title" className="font-display text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
          Teamy đã nhận đơn hàng của bạn!
        </h2>
        <p className="text-xs sm:text-sm text-[#666660] mt-1 max-w-sm">
          Cảm ơn bạn đã lựa chọn Teamy. Chúng tôi sẽ kiểm tra và liên hệ giao hàng trong vòng 24 giờ.
        </p>

        {/* Order Identifier Box */}
        <div className="mt-5 w-full bg-[#F7F7F2] rounded-2xl p-4 border border-[#151515]/10 flex items-center justify-between text-left">
          <div>
            <span className="text-[11px] text-[#666660] block font-medium">Mã Đơn Hàng:</span>
            <span className="font-display text-lg font-black text-[#151515] tracking-wider">
              {order.orderId}
            </span>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#151515]/15 hover:border-[#151515] text-xs font-semibold text-[#151515] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>
        </div>

        {/* Order Details Breakdown */}
        <div className="mt-4 w-full bg-[#F7F7F2] rounded-2xl p-4 border border-[#151515]/10 text-left text-xs space-y-2.5">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#151515]/10">
            <div>
              <span className="text-[#666660]">Khách hàng:</span>
              <p className="font-bold text-[#151515]">{order.customerName}</p>
            </div>
            <div>
              <span className="text-[#666660]">Số điện thoại:</span>
              <p className="font-bold text-[#151515] tabular-nums">{order.phone}</p>
            </div>
            <div className="col-span-2">
              <span className="text-[#666660]">Địa chỉ giao:</span>
              <p className="font-bold text-[#151515]">{order.address}</p>
            </div>
            <div>
              <span className="text-[#666660]">Thanh toán:</span>
              <p className="font-bold text-[#151515]">
                {order.paymentMethod === 'cod' ? 'COD (Tiền mặt khi nhận)' : 'Chuyển khoản (Demo)'}
              </p>
            </div>
            <div>
              <span className="text-[#666660]">Thời gian đặt:</span>
              <p className="font-medium text-[#151515]">{new Date(order.createdAt).toLocaleTimeString('vi-VN')} - {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <span className="text-[#666660] block font-semibold mb-1">Danh sách sản phẩm:</span>
            <div className="space-y-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-[#151515]">
                  <span>• {it.productName} (Size {it.size} × {it.quantity})</span>
                  <span className="font-semibold tabular-nums">{formatVND(it.lineTotal)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 border-t border-[#151515]/10 flex items-baseline justify-between text-sm">
            <span className="font-bold text-[#151515]">Tổng tiền đã lưu:</span>
            <span className="font-display text-base font-black text-[#151515] tabular-nums">
              {formatVND(order.orderTotal)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onContinueShopping}
            className="py-3 px-4 rounded-xl bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tiếp Tục Mua Sắm</span>
          </button>

          <button
            onClick={onOpenDocs}
            className="py-3 px-4 rounded-xl border border-[#151515]/20 hover:border-[#151515] text-[#151515] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xem Bảng Lưu & Thuyết Minh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
