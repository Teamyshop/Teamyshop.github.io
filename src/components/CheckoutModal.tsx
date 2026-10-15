import React, { useState } from 'react';
import { X, ArrowLeft, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, QrCode } from 'lucide-react';
import { CartItem, OrderFormData, PaymentMethod, GoogleSheetsConfig, OrderPayload } from '../types';
import { formatVND, isValidVietnamesePhone, generateOrderId, generateRequestId } from '../utils/format';
import { SHIPPING_POLICY } from '../data/products';
import { submitOrder } from '../services/sheetsService';
import { ShoeVisual } from './ShoeVisual';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  sheetsConfig: GoogleSheetsConfig;
  onOrderSuccess: (orderRecord: OrderPayload, isDemo: boolean) => void;
}

interface FormErrors {
  customerName?: string;
  phone?: string;
  address?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  sheetsConfig,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'form' | 'review'>('form');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= SHIPPING_POLICY.freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : SHIPPING_POLICY.flatRate);
  const orderTotal = subtotal + shippingFee;

  // Validation function
  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    // Validate Customer Name: non-empty, minimum 2 characters (not overly strict)
    if (!formData.customerName.trim()) {
      errs.customerName = 'Vui lòng nhập họ và tên người nhận.';
    } else if (formData.customerName.trim().length < 2) {
      errs.customerName = 'Họ tên phải có ít nhất 2 ký tự.';
    }

    // Validate Vietnamese Phone number
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại liên hệ.';
    } else if (!isValidVietnamesePhone(formData.phone)) {
      errs.phone = 'Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).';
    }

    // Validate Address: non-empty, minimum 6 characters for real delivery address
    if (!formData.address.trim()) {
      errs.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết (Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành).';
    } else if (formData.address.trim().length < 6) {
      errs.address = 'Địa chỉ quá ngắn. Vui lòng ghi rõ thông tin để shipper giao đến nơi.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    if (validateForm()) {
      setCurrentStep('review');
    }
  };

  const handleFinalSubmit = async () => {
    if (isSubmitting) return; // Prevent double submit
    setIsSubmitting(true);
    setSubmissionError('');

    // Prepare full OrderPayload
    const payload: OrderPayload = {
      requestId: generateRequestId(),
      orderId: generateOrderId(),
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      note: formData.note?.trim() || '',
      paymentMethod: formData.paymentMethod,
      items: items.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        category: i.product.categoryLabelVi,
        size: i.size,
        quantity: i.quantity,
        unitPrice: i.product.price,
        lineTotal: i.product.price * i.quantity
      })),
      shippingFee,
      orderTotal,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await submitOrder(payload, sheetsConfig);
      if (response.success) {
        onOrderSuccess(payload, response.isDemo);
      } else {
        throw new Error(response.message || 'Không thể lưu đơn hàng.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setSubmissionError(message);
      // Stay on review or return to form, preserving all data
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#151515]/10 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="p-5 sm:px-8 border-b border-[#151515]/10 flex items-center justify-between bg-[#F7F7F2]">
          <div className="flex items-center gap-3">
            <h2 id="checkout-title" className="font-display text-xl sm:text-2xl font-black text-[#151515]">
              {currentStep === 'form' ? 'Thông Tin Đặt Hàng' : 'Xác Nhận & Đặt Hàng'}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#151515] text-[#C7F464]">
              {currentStep === 'form' ? 'Bước 1/2' : 'Bước 2/2'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#666660] hover:text-[#151515] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng biểu mẫu đặt hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1">
          {submissionError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-red-800 animate-in fade-in">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">Không thể lưu đơn hàng</p>
                <p className="mt-0.5 text-xs text-red-700">{submissionError}</p>
                <p className="mt-1 text-[11px] text-red-600">
                  Thông tin bạn đã nhập được bảo toàn nguyên vẹn. Bạn có thể nhấn thử lại bên dưới.
                </p>
              </div>
            </div>
          )}

          {/* STEP 1: FORM INPUT */}
          {currentStep === 'form' && (
            <form onSubmit={handleProceedToReview} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT: Customer Details */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                  1. Thông Tin Người Nhận Hàng
                </h3>

                {/* Họ và tên */}
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold text-[#151515] mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => {
                      setFormData({ ...formData, customerName: e.target.value });
                      if (errors.customerName) setErrors({ ...errors, customerName: undefined });
                    }}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#151515] bg-[#F7F7F2] focus:bg-white focus:outline-hidden transition-all ${
                      errors.customerName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#151515]/20 focus:border-[#151515]'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.customerName}</p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#151515] mb-1">
                    Số điện thoại liên hệ <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="Ví dụ: 0912345678"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#151515] bg-[#F7F7F2] focus:bg-white focus:outline-hidden transition-all ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#151515]/20 focus:border-[#151515]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.phone}</p>
                  )}
                  <p className="text-[11px] text-[#666660] mt-1">Shipper sẽ gọi số này trước khi giao hàng.</p>
                </div>

                {/* Địa chỉ nhận hàng */}
                <div>
                  <label htmlFor="address" className="block text-xs font-semibold text-[#151515] mb-1">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    rows={2}
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      if (errors.address) setErrors({ ...errors, address: undefined });
                    }}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#151515] bg-[#F7F7F2] focus:bg-white focus:outline-hidden transition-all ${
                      errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-[#151515]/20 focus:border-[#151515]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Ghi chú tùy chọn */}
                <div>
                  <label htmlFor="note" className="block text-xs font-semibold text-[#151515] mb-1">
                    Ghi chú giao hàng (Tùy chọn)
                  </label>
                  <input
                    id="note"
                    type="text"
                    value={formData.note || ''}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi tới..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#151515]/20 text-sm text-[#151515] bg-[#F7F7F2] focus:bg-white focus:outline-hidden focus:border-[#151515] transition-all"
                  />
                </div>

                {/* Phương thức thanh toán */}
                <div className="pt-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                    2. Phương Thức Thanh Toán
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* COD Option */}
                    <label
                      className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#151515] bg-[#151515]/5 ring-1 ring-[#151515]'
                          : 'border-[#151515]/15 hover:border-[#151515]/40 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-[#151515]">COD (Tiền Mặt)</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          Khuyên dùng
                        </span>
                      </div>
                      <p className="text-xs text-[#666660]">
                        Thanh toán tiền mặt cho shipper sau khi kiểm tra hàng tại nhà.
                      </p>
                    </label>

                    {/* Banking Option (Demo) */}
                    <label
                      className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'banking'
                          ? 'border-[#151515] bg-[#151515]/5 ring-1 ring-[#151515]'
                          : 'border-[#151515]/15 hover:border-[#151515]/40 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="banking"
                        checked={formData.paymentMethod === 'banking'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'banking' })}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-[#151515]">Chuyển Khoản</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                          Minh họa
                        </span>
                      </div>
                      <p className="text-xs text-[#666660]">
                        Chuyển khoản qua mã QR ngân hàng (chưa tích hợp cổng tự động).
                      </p>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Xem Lại Đơn Hàng &rarr;
                  </button>
                </div>
              </div>

              {/* RIGHT: Selected Items Review */}
              <div className="lg:col-span-5 bg-[#F7F7F2] p-5 rounded-2xl border border-[#151515]/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#151515] mb-3">
                    Sản Phẩm Đã Chọn ({items.length})
                  </h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#151515]/5">
                        <div className="w-12 h-12 rounded-lg bg-[#F7F7F2] p-1 shrink-0 flex items-center justify-center">
                          <ShoeVisual product={item.product} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#151515] truncate">{item.product.name}</h4>
                          <div className="text-[11px] text-[#666660] flex items-center gap-2 mt-0.5">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>SL: <strong>{item.quantity}</strong></span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#151515] tabular-nums shrink-0">
                          {formatVND(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost breakdown */}
                <div className="pt-4 mt-4 border-t border-[#151515]/10 space-y-2 text-xs">
                  <div className="flex justify-between text-[#666660]">
                    <span>Tạm tính hàng:</span>
                    <span className="font-semibold text-[#151515] tabular-nums">{formatVND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#666660]">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold text-[#151515] tabular-nums">
                      {shippingFee === 0 ? <span className="text-emerald-700">Miễn phí</span> : formatVND(shippingFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#151515]/10 flex items-baseline justify-between text-sm">
                    <span className="font-bold text-[#151515]">Tổng thanh toán:</span>
                    <span className="font-display text-lg font-black text-[#151515] tabular-nums">
                      {formatVND(orderTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: REVIEW & CONFIRM */}
          {currentStep === 'review' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Vui lòng rà soát lại thông tin trước khi nhấn nút xác nhận đặt hàng.</span>
              </div>

              {/* Review card */}
              <div className="bg-[#F7F7F2] p-6 rounded-2xl border border-[#151515]/10 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#666660] block">Người nhận:</span>
                    <strong className="text-[#151515] text-sm">{formData.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-[#666660] block">Số điện thoại:</span>
                    <strong className="text-[#151515] text-sm tabular-nums">{formData.phone}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#666660] block">Địa chỉ giao hàng:</span>
                    <strong className="text-[#151515] text-sm">{formData.address}</strong>
                  </div>
                  <div>
                    <span className="text-[#666660] block">Phương thức:</span>
                    <strong className="text-[#151515]">
                      {formData.paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản (Minh họa)'}
                    </strong>
                  </div>
                  {formData.note && (
                    <div>
                      <span className="text-[#666660] block">Ghi chú:</span>
                      <span className="text-[#151515] italic">{formData.note}</span>
                    </div>
                  )}
                </div>

                {/* Banking demo instructions */}
                {formData.paymentMethod === 'banking' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
                    <QrCode className="w-6 h-6 text-amber-700 shrink-0" />
                    <div>
                      <p className="font-bold">Lưu ý thanh toán chuyển khoản:</p>
                      <p className="mt-0.5">
                        Đây là tính năng minh họa cho bài tập môn học. Hệ thống chưa tích hợp cổng thanh toán tự động, đơn hàng sẽ được ghi nhận và xác nhận thủ công.
                      </p>
                    </div>
                  </div>
                )}

                {/* Items summary */}
                <div className="pt-3 border-t border-[#151515]/10">
                  <span className="text-xs font-bold text-[#151515] block mb-2">Chi tiết sản phẩm:</span>
                  <div className="space-y-1.5 text-xs text-[#151515]">
                    {items.map((i) => (
                      <div key={`${i.product.id}-${i.size}`} className="flex justify-between">
                        <span>{i.product.name} (Size: {i.size}, SL: {i.quantity})</span>
                        <span className="font-semibold tabular-nums">{formatVND(i.product.price * i.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#151515]/10 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-[#151515]">Tổng giá trị đơn:</span>
                    <span className="font-display text-xl font-black text-[#151515] tabular-nums">
                      {formatVND(orderTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status indicator on sheets */}
              <div className="text-[11px] text-[#666660] flex items-center justify-between">
                <span>
                  Đích lưu dữ liệu:{' '}
                  {sheetsConfig.webAppUrl ? (
                    <strong className="text-emerald-700">Google Sheet thực tế</strong>
                  ) : (
                    <strong className="text-amber-700">Chế độ Demo bài tập</strong>
                  )}
                </span>
                <span className="italic">Chống ghi trùng tự động</span>
              </div>

              {/* Submit Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('form')}
                  disabled={isSubmitting}
                  className="py-3 px-4 rounded-xl border border-[#151515]/30 text-xs sm:text-sm font-semibold text-[#151515] hover:bg-black/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sửa thông tin</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="py-3 px-4 rounded-xl bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang lưu đơn hàng...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Xác Nhận Đặt Hàng</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
