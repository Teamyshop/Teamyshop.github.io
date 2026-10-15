import React, { useState } from 'react';
import { X, FileSpreadsheet, Check, Copy, CheckCheck, Loader2, RefreshCw, Trash2, ShieldAlert } from 'lucide-react';
import { GoogleSheetsConfig, OrderPayload } from '../types';
import { GOOGLE_APPS_SCRIPT_CODE, testGoogleAppsScriptConnection, saveSheetsConfig, LOCAL_STORAGE_DEMO_ORDERS_KEY } from '../services/sheetsService';
import { formatVND } from '../utils/format';

interface SheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GoogleSheetsConfig;
  onSaveConfig: (newConfig: GoogleSheetsConfig) => void;
}

export const SheetsConfigModal: React.FC<SheetsConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [urlInput, setUrlInput] = useState<string>(config.webAppUrl || '');
  const [useDemo, setUseDemo] = useState<boolean>(config.useDemoMode);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [codeCopied, setCodeCopied] = useState<boolean>(false);
  const [demoOrders, setDemoOrders] = useState<OrderPayload[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_DEMO_ORDERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testGoogleAppsScriptConnection(urlInput);
    setIsTesting(false);
    setTestResult(result);
  };

  const handleSave = () => {
    const updated: GoogleSheetsConfig = {
      webAppUrl: urlInput.trim(),
      useDemoMode: useDemo,
      lastConnectedStatus: testResult ? (testResult.success ? 'success' : 'error') : config.lastConnectedStatus,
      lastStatusMessage: testResult ? testResult.message : config.lastStatusMessage
    };
    saveSheetsConfig(updated);
    onSaveConfig(updated);
    onClose();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  const handleClearDemoOrders = () => {
    if (confirm('Bạn có chắc muốn xóa danh sách các đơn hàng mô phỏng đã lưu trên trình duyệt này?')) {
      localStorage.removeItem(LOCAL_STORAGE_DEMO_ORDERS_KEY);
      setDemoOrders([]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheets-config-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#151515]/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:px-8 border-b border-[#151515]/10 flex items-center justify-between bg-[#F7F7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sheets-config-title" className="font-display text-lg font-bold text-[#151515]">
                Cấu Hình Kết Nối Google Sheets
              </h2>
              <p className="text-[11px] text-[#666660]">
                Lưu trữ đơn hàng thực tế vào bảng tính Google Drive qua Google Apps Script Web App
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#666660] hover:text-[#151515] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1 space-y-6">
          {/* Status Alert */}
          <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
            urlInput.trim()
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {urlInput.trim() ? 'Chế độ lưu thực tế vào Google Sheet' : 'Hiện đang chạy ở Chế độ Demo Bài Tập'}
              </p>
              <p className="mt-0.5 leading-relaxed">
                {urlInput.trim()
                  ? 'Mỗi đơn hàng mới sẽ được gửi trực tiếp đến URL Web App bên dưới và ghi vào Google Sheet của bạn.'
                  : 'Bạn chưa dán URL Web App. Khi đặt hàng, đơn sẽ được lưu mô phỏng vào LocalStorage để bạn vẫn kiểm thử được đầy đủ luồng nghiệp vụ.'}
              </p>
            </div>
          </div>

          {/* Web App URL Input */}
          <div className="space-y-2">
            <label htmlFor="sheetsUrl" className="block text-xs font-bold uppercase tracking-wider text-[#151515]">
              Đường dẫn Google Apps Script Web App (URL)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="sheetsUrl"
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setTestResult(null);
                }}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#151515]/20 text-xs sm:text-sm text-[#151515] bg-[#F7F7F2] focus:bg-white focus:outline-hidden focus:border-[#151515]"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !urlInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 whitespace-nowrap"
              >
                {isTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Kiểm tra kết nối</span>
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-xl text-xs font-medium animate-in fade-in ${
                testResult.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {testResult.message}
              </div>
            )}
          </div>

          {/* Fallback Checkbox */}
          <div className="flex items-center gap-2.5 text-xs text-[#151515]">
            <input
              id="useDemoCheck"
              type="checkbox"
              checked={useDemo}
              onChange={(e) => setUseDemo(e.target.checked)}
              className="w-4 h-4 rounded-xs border-gray-300 text-[#151515] focus:ring-[#151515]"
            />
            <label htmlFor="useDemoCheck" className="cursor-pointer font-medium">
              Cho phép chuyển về Chế độ Demo nếu chưa điền URL Google Sheets (đảm bảo chấm bài không bị nghẽn).
            </label>
          </div>

          {/* Code.gs Quick Copy Box */}
          <div className="border border-[#151515]/10 rounded-2xl p-4 bg-[#F7F7F2]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#151515]">
                Mã nguồn Google Apps Script (Code.gs) chuẩn 18 cột:
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-black/5 text-[#151515] text-xs font-semibold rounded-lg border border-[#151515]/20 cursor-pointer transition-colors"
              >
                {codeCopied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép mã</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép mã</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="p-3 bg-[#151515] text-[#C7F464] text-[11px] rounded-xl overflow-x-auto max-h-36 font-mono leading-relaxed">
                {GOOGLE_APPS_SCRIPT_CODE}
              </pre>
            </div>
          </div>

          {/* Local Demo Orders inspector */}
          {demoOrders.length > 0 && (
            <div className="border border-[#151515]/10 rounded-2xl p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#151515]">
                  Các đơn hàng đã lưu ở Chế độ Demo ({demoOrders.length}):
                </span>
                <button
                  type="button"
                  onClick={handleClearDemoOrders}
                  className="flex items-center gap-1 text-[11px] text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Xóa đơn demo</span>
                </button>
              </div>

              <div className="max-h-40 overflow-y-auto divide-y divide-gray-100 text-xs">
                {demoOrders.slice(0, 5).map((o) => (
                  <div key={o.requestId} className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#151515]">{o.orderId}</span> - {o.customerName} ({o.phone})
                      <div className="text-[11px] text-[#666660]">
                        {o.items.length} món · {new Date(o.createdAt).toLocaleTimeString('vi-VN')}
                      </div>
                    </div>
                    <span className="font-bold tabular-nums text-[#151515]">{formatVND(o.orderTotal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-8 border-t border-[#151515]/10 bg-[#F7F7F2] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#151515]/20 text-xs font-semibold text-[#151515] hover:bg-black/5 cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#151515] hover:bg-[#C7F464] text-white hover:text-[#151515] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Lưu Cấu Hình</span>
          </button>
        </div>
      </div>
    </div>
  );
};
