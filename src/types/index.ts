export type SportCategory = 'badminton' | 'tennis' | 'running';

export interface ShoeSizeStock {
  size: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: SportCategory;
  categoryLabelVi: string;
  subTypeVi: string;
  price: number;
  originalPrice?: number;
  tagline: string;
  description: string;
  features: string[];
  specs: {
    upper: string;
    midsole: string;
    outsole: string;
    weight: string;
    courtType: string;
  };
  sizes: ShoeSizeStock[];
  colorScheme: {
    primary: string;
    accent: string;
    sole: string;
    label: string;
  };
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'banking';

export interface OrderFormData {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
}

export interface OrderItemPayload {
  productId: string;
  productName: string;
  category: string;
  size: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderPayload {
  requestId: string;
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: PaymentMethod;
  items: OrderItemPayload[];
  shippingFee: number;
  orderTotal: number;
  createdAt: string;
  isDemo?: boolean;
}

export interface OrderRecord extends OrderPayload {
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERING';
}

export interface GoogleSheetsConfig {
  webAppUrl: string;
  useDemoMode: boolean;
  lastConnectedStatus?: 'idle' | 'success' | 'error';
  lastStatusMessage?: string;
}
