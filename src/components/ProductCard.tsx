import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/format';
import { ShoeVisual } from './ShoeVisual';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onQuickBuy
}) => {
  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const isOutOfStock = totalStock === 0;

  return (
    <div className="group relative bg-white border border-[#151515]/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Visual Area */}
      <div
        onClick={() => onViewDetails(product)}
        className="relative w-full aspect-[4/3] rounded-xl bg-[#F7F7F2] overflow-hidden flex items-center justify-center cursor-pointer"
      >
        <ShoeVisual product={product} />

        {/* Hover quick action pill */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 bg-[#151515] text-[#C7F464] text-xs font-semibold rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Xem chi tiết
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-4 flex flex-col flex-1">
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-1.5 text-xs text-[#666660] mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-[#151515]">
            {product.categoryLabelVi}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{product.subTypeVi}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(product)}
          className="font-display text-base sm:text-lg font-bold text-[#151515] leading-snug group-hover:text-black cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Short Tagline */}
        <p className="text-xs text-[#666660] line-clamp-2 mt-1 leading-relaxed">
          {product.tagline}
        </p>

        {/* Price & Stock info */}
        <div className="mt-4 pt-3 border-t border-[#151515]/10 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-base sm:text-lg text-[#151515] tabular-nums">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#666660] line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-[#666660]">
            {isOutOfStock ? (
              <span className="text-red-500 font-semibold">Tạm hết hàng</span>
            ) : (
              <span>Còn {totalStock} đôi</span>
            )}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="w-full py-2 px-3 text-xs font-semibold rounded-lg border border-[#151515]/20 hover:border-[#151515] text-[#151515] bg-transparent hover:bg-black/5 transition-colors cursor-pointer text-center"
          >
            Chi tiết
          </button>
          <button
            onClick={() => onQuickBuy(product)}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Đặt mua</span>
          </button>
        </div>
      </div>
    </div>
  );
};
