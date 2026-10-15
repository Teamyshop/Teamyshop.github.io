/**
 * Format currency number to Vietnamese Dong string: 1850000 -> "1.850.000 ₫"
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount).replace('VND', '₫');
}

/**
 * Normalizes Vietnamese string by removing diacritical marks for robust search
 */
export function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

/**
 * Validates a Vietnamese mobile phone number
 * Format: 10 digits starting with 03, 05, 07, 08, 09
 */
export function isValidVietnamesePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s.-]/g, '');
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  return vnPhoneRegex.test(cleanPhone);
}

/**
 * Generates human-friendly order identifier: TMY-YYMMDD-XXXX
 */
export function generateOrderId(): string {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `TMY-${year}${month}${day}-${randomSuffix}`;
}

/**
 * Generates a unique request idempotency key
 */
export function generateRequestId(): string {
  return 'req_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

/**
 * Sanitizes input strings before sending to spreadsheet to prevent formula injection
 * (prepends an apostrophe if text starts with =, +, -, @, \t, \r)
 */
export function sanitizeForSheet(value: string | number): string {
  if (typeof value === 'number') return String(value);
  if (!value) return '';
  const trimmed = String(value).trim();
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousPrefixes.some(prefix => trimmed.startsWith(prefix))) {
    return `'${trimmed}`;
  }
  return trimmed;
}
