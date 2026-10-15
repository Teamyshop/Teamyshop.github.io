import React, { useState, useEffect, useMemo } from 'react';
import { Filter, ArrowUpDown, Search, RotateCcw, Sparkles } from 'lucide-react';
import { Product, SportCategory, CartItem, GoogleSheetsConfig, OrderPayload } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { removeAccents } from './utils/format';
import { getSavedSheetsConfig, LOCAL_STORAGE_SHEETS_KEY } from './services/sheetsService';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ShoeAdvisorModal } from './components/ShoeAdvisorModal';
import { DocumentationModal } from './components/DocumentationModal';
import { SheetsConfigModal } from './components/SheetsConfigModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_CART_KEY = 'teamy_cart_items';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeCategory, setActiveCategory] = useState<SportCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isSheetsConfigOpen, setIsSheetsConfigOpen] = useState<boolean>(false);

  // Cart Items (loaded from localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Google Sheets Config
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(getSavedSheetsConfig);

  // Last successful order
  const [lastOrder, setLastOrder] = useState<OrderPayload | null>(null);
  const [isLastOrderDemo, setIsLastOrderDemo] = useState<boolean>(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore quota errors
    }
  }, [cartItems]);

  // Total items count in cart
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Featured hero product
  const heroProduct = useMemo(() => {
    return PRODUCTS.find(p => p.id === 'tmy-bl-01') || PRODUCTS[0];
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Search filter (Normalized accent-insensitive)
      if (searchQuery.trim()) {
        const queryClean = removeAccents(searchQuery);
        const nameClean = removeAccents(product.name);
        const catClean = removeAccents(product.categoryLabelVi);
        const subClean = removeAccents(product.subTypeVi);
        const descClean = removeAccents(product.description);

        const match =
          nameClean.includes(queryClean) ||
          catClean.includes(queryClean) ||
          subClean.includes(queryClean) ||
          descClean.includes(queryClean);

        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
    });
  }, [activeCategory, searchQuery, sortBy]);

  // --- CART HANDLERS ---
  const handleAddToCart = (product: Product, size: number, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.product.id === product.id && i.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, size, quantity }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, size: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleQuickBuy = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleBuyNowFromDetail = (product: Product, size: number, quantity: number) => {
    handleAddToCart(product, size, quantity);
    setIsDetailModalOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderPayload, isDemo: boolean) => {
    setLastOrder(order);
    setIsLastOrderDemo(isDemo);
    setCartItems([]); // Empty cart on success
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#151515] selection:bg-[#C7F464] selection:text-[#151515]">
      {/* 1. STICKY TOP HEADER */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSheetsConfig={() => setIsSheetsConfigOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        isSheetsConnected={Boolean(sheetsConfig.webAppUrl && sheetsConfig.webAppUrl.trim())}
      />

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <Hero
          heroProduct={heroProduct}
          onExploreClick={() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onQuickView={(p) => {
            setSelectedProduct(p);
            setIsDetailModalOpen(true);
          }}
        />

        {/* 3. MARQUEE STRIP */}
        <MarqueeStrip />

        {/* 4. THREE CATEGORY SHOWCASE */}
        <CategoryShowcase
          products={PRODUCTS}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
          }}
        />

        {/* 5. PRODUCTS CATALOG SECTION */}
        <section id="products-section" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Category Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#151515]/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#666660] mb-1">
                <span>BỘ SƯU TẬP TEAMY</span>
                <span>·</span>
                <span>{filteredProducts.length} SẢN PHẨM</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight">
                {activeCategory === 'all' && 'Tất Cả Giày Thể Thao'}
                {activeCategory === 'badminton' && 'Giày Cầu Lông Chuyên Dụng'}
                {activeCategory === 'tennis' && 'Giày Tennis Mặt Sân Cứng & Đất Nện'}
                {activeCategory === 'running' && 'Giày Chạy Bộ Khí Động Học'}
              </h2>
            </div>

            {/* Filter Tabs & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Segmented Control */}
              <div className="flex items-center p-1 bg-white border border-[#151515]/15 rounded-xl shadow-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as SportCategory | 'all')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-[#151515] text-[#C7F464] shadow-xs'
                        : 'text-[#666660] hover:text-[#151515]'
                    }`}
                  >
                    {cat.id === 'all' ? 'Tất Cả' : cat.labelVi.replace('Giày ', '')}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center bg-white border border-[#151515]/15 rounded-xl px-3 py-1.5 shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#666660] mr-2 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold text-[#151515] bg-transparent focus:outline-hidden cursor-pointer"
                  aria-label="Sắp xếp sản phẩm"
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name">Tên sản phẩm (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Search/Filter Tag Indicator */}
          {searchQuery && (
            <div className="mt-4 flex items-center justify-between bg-white border border-[#151515]/10 px-4 py-2 rounded-xl text-xs">
              <span className="text-[#666660]">
                Kết quả tìm kiếm cho: <strong className="text-[#151515]">&quot;{searchQuery}&quot;</strong> ({filteredProducts.length} kết quả)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-bold text-red-600 hover:text-red-800 cursor-pointer"
              >
                Xóa từ khóa
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(p) => {
                    setSelectedProduct(p);
                    setIsDetailModalOpen(true);
                  }}
                  onQuickBuy={(p) => handleQuickBuy(p)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-12 py-16 text-center bg-white rounded-3xl border border-[#151515]/10 max-w-md mx-auto p-8">
              <div className="w-12 h-12 rounded-full bg-[#F7F7F2] flex items-center justify-center text-[#666660] mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#151515]">
                Không tìm thấy sản phẩm phù hợp
              </h3>
              <p className="text-xs text-[#666660] mt-1 mb-5">
                Vui lòng thử tìm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ 12 mẫu giày.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-5 py-2.5 bg-[#151515] text-[#C7F464] text-xs font-bold rounded-xl flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            </div>
          )}
        </section>

        {/* 6. ABOUT TEAMY & VALUES */}
        <AboutSection />
      </main>

      {/* 7. FOOTER */}
      <Footer
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSheetsConfig={() => setIsSheetsConfigOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNowFromDetail}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        sheetsConfig={sheetsConfig}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        order={lastOrder}
        isDemo={isLastOrderDemo}
        onContinueShopping={() => {
          setIsSuccessModalOpen(false);
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDocs={() => {
          setIsSuccessModalOpen(false);
          setIsDocsOpen(true);
        }}
      />

      {/* Shoe Advisor Helper Modal */}
      <ShoeAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsDetailModalOpen(true);
        }}
      />

      {/* Coursework Documentation & Flowchart Modal */}
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        onOpenSheetsConfig={() => {
          setIsDocsOpen(false);
          setIsSheetsConfigOpen(true);
        }}
      />

      {/* Google Sheets Config Modal */}
      <SheetsConfigModal
        isOpen={isSheetsConfigOpen}
        onClose={() => setIsSheetsConfigOpen(false)}
        config={sheetsConfig}
        onSaveConfig={(newConfig) => setSheetsConfig(newConfig)}
      />
    </div>
  );
}
