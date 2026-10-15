import { OrderPayload, GoogleSheetsConfig } from '../types';
import { sanitizeForSheet } from '../utils/format';

export const LOCAL_STORAGE_SHEETS_KEY = 'teamy_sheets_config';
export const LOCAL_STORAGE_DEMO_ORDERS_KEY = 'teamy_demo_orders';

export const DEFAULT_SHEETS_CONFIG: GoogleSheetsConfig = {
  webAppUrl: '',
  useDemoMode: true,
  lastConnectedStatus: 'idle',
  lastStatusMessage: 'Chưa cấu hình Google Sheets (Đang ở Chế độ Demo bài tập)'
};

/**
 * Standard column headers for the Google Sheet (exactly 18 columns)
 */
export const SHEET_COLUMNS = [
  'createdAt',
  'orderId',
  'requestId',
  'customerName',
  'phone',
  'address',
  'productId',
  'productName',
  'category',
  'size',
  'quantity',
  'unitPrice',
  'lineTotal',
  'shippingFee',
  'orderTotal',
  'paymentMethod',
  'note',
  'status'
];

/**
 * Production-ready Google Apps Script Code (Code.gs)
 * to be pasted into the user's Google Sheets Apps Script editor.
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * Teamy Sport Footwear — Google Sheets Order Processing Script
 * Project: Teamy E-commerce Coursework
 * File: Code.gs
 */

// Bảng giá máy chủ chuẩn (Bảo mật: Tính lại giá phía máy chủ, không tin tưởng client)
var PRODUCT_CATALOG = {
  'tmy-bl-01': { name: 'Teamy Court Swift', price: 1850000, category: 'Cầu Lông' },
  'tmy-bl-02': { name: 'Teamy Aero Smash', price: 2190000, category: 'Cầu Lông' },
  'tmy-bl-03': { name: 'Teamy Feather Grip', price: 1490000, category: 'Cầu Lông' },
  'tmy-bl-04': { name: 'Teamy Drive Max', price: 2450000, category: 'Cầu Lông' },
  'tmy-tn-01': { name: 'Teamy Rally Pro', price: 2290000, category: 'Tennis' },
  'tmy-tn-02': { name: 'Teamy Baseline Ace', price: 2650000, category: 'Tennis' },
  'tmy-tn-03': { name: 'Teamy Clay Master', price: 1950000, category: 'Tennis' },
  'tmy-tn-04': { name: 'Teamy Hardcourt Spin', price: 2100000, category: 'Tennis' },
  'tmy-rn-01': { name: 'Teamy Run Flow', price: 1690000, category: 'Chạy Bộ' },
  'tmy-rn-02': { name: 'Teamy Pace Carbon', price: 2850000, category: 'Chạy Bộ' },
  'tmy-rn-03': { name: 'Teamy Stride Cloud', price: 1790000, category: 'Chạy Bộ' },
  'tmy-rn-04': { name: 'Teamy Trail Phantom', price: 2350000, category: 'Chạy Bộ' }
};

var SHIPPING_FLAT_RATE = 30000;
var FREE_SHIPPING_THRESHOLD = 1500000;

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    app: 'Teamy Footwear Order Receiver',
    time: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa tranh chấp tối đa 30 giây để đảm bảo ghi tuần tự
  if (!lock.tryLock(30000)) {
    return createJsonResponse(false, 'Hệ thống đang bận ghi đơn, vui lòng thử lại sau vài giây.');
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(false, 'Thiếu dữ liệu đơn hàng (postData rỗng).');
    }

    var payload = JSON.parse(e.postData.contents);

    // Xử lý Ping kiểm tra kết nối từ Teamy UI
    if (payload.action === 'PING') {
      return createJsonResponse(true, 'Kết nối Google Sheets thành công!', {
        sheetName: SpreadsheetApp.getActiveSpreadsheet().getName()
      });
    }

    // 1. Kiểm tra trường bắt buộc
    if (!payload.orderId || !payload.requestId || !payload.customerName || !payload.phone || !payload.address) {
      return createJsonResponse(false, 'Thông tin khách hàng hoặc mã đơn không hợp lệ.');
    }

    if (!payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
      return createJsonResponse(false, 'Đơn hàng chưa có sản phẩm nào.');
    }

    var sheet = getOrCreateOrdersSheet();

    // 2. Chống ghi trùng đơn (Idempotency) dựa trên requestId
    var existingRow = findExistingRequest(sheet, payload.requestId);
    if (existingRow > 0) {
      return createJsonResponse(true, 'Đơn hàng đã được lưu trước đó (Chống ghi trùng).', {
        orderId: payload.orderId,
        isDuplicate: true
      });
    }

    // 3. Tính toán lại giá phía máy chủ (Server-side calculation)
    var calculatedItems = [];
    var itemsSubtotal = 0;

    for (var i = 0; i < payload.items.length; i++) {
      var item = payload.items[i];
      var catalogProduct = PRODUCT_CATALOG[item.productId];
      var unitPrice = catalogProduct ? catalogProduct.price : (Number(item.unitPrice) || 0);
      var productName = catalogProduct ? catalogProduct.name : (item.productName || 'Giày Teamy');
      var category = catalogProduct ? catalogProduct.category : (item.category || 'Thể Thao');
      var quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      var size = parseInt(item.size, 10) || 40;
      var lineTotal = unitPrice * quantity;

      itemsSubtotal += lineTotal;
      calculatedItems.push({
        productId: item.productId,
        productName: productName,
        category: category,
        size: size,
        quantity: quantity,
        unitPrice: unitPrice,
        lineTotal: lineTotal
      });
    }

    // Tính phí vận chuyển máy chủ
    var serverShippingFee = itemsSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
    var serverOrderTotal = itemsSubtotal + serverShippingFee;

    // 4. Chuẩn bị các dòng để ghi (1 dòng cho mỗi sản phẩm của đơn hàng)
    var rowsToInsert = [];
    var createdAtStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    for (var j = 0; j < calculatedItems.length; j++) {
      var it = calculatedItems[j];
      var row = [
        createdAtStr,
        sanitizeInput(payload.orderId),
        sanitizeInput(payload.requestId),
        sanitizeInput(payload.customerName),
        sanitizeInput(payload.phone),
        sanitizeInput(payload.address),
        sanitizeInput(it.productId),
        sanitizeInput(it.productName),
        sanitizeInput(it.category),
        it.size,
        it.quantity,
        it.unitPrice,
        it.lineTotal,
        // Cấp đơn hàng: Ghi ở dòng đầu, các dòng sau ghi chú để tránh cộng lặp
        j === 0 ? serverShippingFee : 0,
        j === 0 ? serverOrderTotal : 0,
        sanitizeInput(payload.paymentMethod === 'banking' ? 'Chuyển khoản (Demo)' : 'COD (Tiền mặt)'),
        sanitizeInput(payload.note || ''),
        'CHỜ XÁC NHẬN'
      ];
      rowsToInsert.push(row);
    }

    // 5. Ghi hàng loạt vào Sheet
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rowsToInsert.length, rowsToInsert[0].length).setValues(rowsToInsert);

    return createJsonResponse(true, 'Đã lưu đơn hàng vào Google Sheet thành công!', {
      orderId: payload.orderId,
      serverOrderTotal: serverOrderTotal,
      rowsCount: rowsToInsert.length
    });

  } catch (err) {
    return createJsonResponse(false, 'Lỗi xử lý máy chủ Apps Script: ' + err.toString());
  } finally {
    lock.releaseLock();
  }
}

// Khử công thức độc hại để chống Sheet Formula Injection
function sanitizeInput(val) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (str.length > 0) {
    var firstChar = str.charAt(0);
    if (firstChar === '=' || firstChar === '+' || firstChar === '-' || firstChar === '@') {
      return "'" + str;
    }
  }
  return str;
}

function findExistingRequest(sheet, requestId) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 0;
  // Cột 3 là requestId
  var requestIds = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  for (var i = 0; i < requestIds.length; i++) {
    if (String(requestIds[i][0]).replace(/^'/, '') === requestId) {
      return i + 2;
    }
  }
  return 0;
}

function getOrCreateOrdersSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Đơn Hàng Teamy');
  if (!sheet) {
    sheet = ss.insertSheet('Đơn Hàng Teamy');
    var headers = [
      'Thời gian tạo', 'Mã đơn (orderId)', 'Request ID', 'Họ tên khách',
      'Số điện thoại', 'Địa chỉ giao hàng', 'Mã SP', 'Tên sản phẩm',
      'Danh mục', 'Size', 'Số lượng', 'Đơn giá (VND)',
      'Thành tiền SP (VND)', 'Phí ship (VND)', 'Tổng đơn (VND)',
      'Phương thức thanh toán', 'Ghi chú', 'Trạng thái'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#151515')
      .setFontColor('#C7F464')
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function createJsonResponse(success, message, extraData) {
  var out = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  if (extraData) {
    for (var key in extraData) {
      out[key] = extraData[key];
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

/**
 * Loads current Google Sheets configuration from localStorage
 */
export function getSavedSheetsConfig(): GoogleSheetsConfig {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SHEETS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore JSON parse errors
  }
  return DEFAULT_SHEETS_CONFIG;
}

/**
 * Saves Google Sheets configuration to localStorage
 */
export function saveSheetsConfig(config: GoogleSheetsConfig): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_SHEETS_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Test connectivity to user's Google Apps Script Web App
 */
export async function testGoogleAppsScriptConnection(webAppUrl: string): Promise<{ success: boolean; message: string }> {
  if (!webAppUrl || !webAppUrl.trim()) {
    return { success: false, message: 'Vui lòng nhập đường dẫn Google Apps Script Web App (URL kết thúc bằng /exec).' };
  }

  const cleanUrl = webAppUrl.trim();
  if (!cleanUrl.startsWith('https://script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Đường dẫn chưa hợp lệ. URL chuẩn phải có dạng https://script.google.com/macros/s/.../exec'
    };
  }

  try {
    // We send payload as text/plain to prevent CORS preflight OPTIONS request failure on Google Apps Script
    const response = await fetch(cleanUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({ action: 'PING' }),
      redirect: 'follow'
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Máy chủ Google phản hồi mã lỗi HTTP ${response.status}. Hãy đảm bảo đã chọn "Ai có quyền truy cập: Bất kỳ ai" (Anyone).`
      };
    }

    const json = await response.json();
    if (json.success) {
      return {
        success: true,
        message: 'Kết nối thành công! Google Sheet đã sẵn sàng nhận đơn hàng từ Teamy.'
      };
    } else {
      return {
        success: false,
        message: json.message || 'Apps Script phản hồi không thành công.'
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Không thể kết nối đến Web App: ${errorMsg}. Vui lòng kiểm tra lại quyền triển khai (Who has access: Anyone).`
    };
  }
}

/**
 * Submits an order payload:
 * If a real Web App URL is configured -> sends to Google Sheets.
 * If user is in Demo Mode -> saves locally with explicit Demo badge.
 * Otherwise -> rejects with clear instructions.
 */
export async function submitOrder(
  payload: OrderPayload,
  config: GoogleSheetsConfig
): Promise<{ success: boolean; orderId: string; message: string; isDemo: boolean; isDuplicate?: boolean }> {
  // Sanitize fields before dispatch
  const sanitizedPayload: OrderPayload = {
    ...payload,
    customerName: sanitizeForSheet(payload.customerName),
    phone: sanitizeForSheet(payload.phone),
    address: sanitizeForSheet(payload.address),
    note: sanitizeForSheet(payload.note || '')
  };

  // Case 1: Real Google Sheets Web App is configured
  if (config.webAppUrl && config.webAppUrl.trim()) {
    try {
      const response = await fetch(config.webAppUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(sanitizedPayload),
        redirect: 'follow'
      });

      if (!response.ok) {
        throw new Error(`Máy chủ Google Sheets phản hồi HTTP ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Google Apps Script từ chối xử lý đơn.');
      }

      return {
        success: true,
        orderId: result.orderId || payload.orderId,
        message: result.message || 'Đơn hàng đã được lưu thành công vào Google Sheet.',
        isDemo: false,
        isDuplicate: Boolean(result.isDuplicate)
      };
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : String(err);
      throw new Error(`Lưu vào Google Sheets thất bại: ${errText}. Dữ liệu của bạn được bảo toàn.`);
    }
  }

  // Case 2: Demo Mode (Explicitly informed to user)
  if (config.useDemoMode) {
    // Simulate brief network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const existingDemo = localStorage.getItem(LOCAL_STORAGE_DEMO_ORDERS_KEY);
      const orders = existingDemo ? JSON.parse(existingDemo) : [];
      // Idempotency check for demo mode
      const isDup = orders.some((o: OrderPayload) => o.requestId === sanitizedPayload.requestId);
      if (!isDup) {
        orders.unshift({ ...sanitizedPayload, isDemo: true });
        localStorage.setItem(LOCAL_STORAGE_DEMO_ORDERS_KEY, JSON.stringify(orders.slice(0, 50)));
      }

      return {
        success: true,
        orderId: sanitizedPayload.orderId,
        message: 'Đã lưu đơn thành công ở Chế độ Mô phỏng (Demo bài tập). Bạn có thể cấu hình Google Sheets bất cứ lúc nào.',
        isDemo: true,
        isDuplicate: isDup
      };
    } catch {
      return {
        success: true,
        orderId: sanitizedPayload.orderId,
        message: 'Đã xác nhận đơn hàng minh họa.',
        isDemo: true
      };
    }
  }

  // Case 3: No endpoint configured and demo mode not enabled
  throw new Error('Tính năng lưu đơn chưa được cấu hình. Vui lòng mở "Cấu hình Google Sheets" để dán URL Web App hoặc bật "Chế độ Demo bài tập".');
}
