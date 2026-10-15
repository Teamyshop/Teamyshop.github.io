import React, { useState } from 'react';
import { X, GitCommit, CheckSquare, Presentation, HelpCircle, FileSpreadsheet, ArrowRight, ShieldCheck, Copy, CheckCheck } from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../services/sheetsService';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSheetsConfig: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
  onOpenSheetsConfig
}) => {
  const [activeTab, setActiveTab] = useState<'flowchart' | 'mapping' | 'sheets-guide' | 'presentation' | 'testing'>('flowchart');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#151515]/10 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#151515]/10 bg-[#F7F7F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#151515] text-[#C7F464] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="docs-modal-title" className="font-display text-lg sm:text-xl font-black text-[#151515]">
                Tài Liệu Đề Bài & Thuyết Minh Môn Học
              </h2>
              <p className="text-xs text-[#666660]">
                Thương hiệu Teamy · Nghiệm thu bài tập website thương mại điện tử
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#666660] hover:text-[#151515] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng tài liệu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Segmented button bar) */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-[#151515]/10 bg-white flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flowchart'
                ? 'bg-[#151515] text-[#C7F464]'
                : 'text-[#666660] hover:text-[#151515] hover:bg-[#F7F7F2]'
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>1. Flowchart Quy Trình</span>
          </button>

          <button
            onClick={() => setActiveTab('mapping')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mapping'
                ? 'bg-[#151515] text-[#C7F464]'
                : 'text-[#666660] hover:text-[#151515] hover:bg-[#F7F7F2]'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>2. Đối Chiếu Yêu Cầu Đề</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets-guide')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sheets-guide'
                ? 'bg-[#151515] text-[#C7F464]'
                : 'text-[#666660] hover:text-[#151515] hover:bg-[#F7F7F2]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>3. Hướng Dẫn Google Sheets</span>
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'presentation'
                ? 'bg-[#151515] text-[#C7F464]'
                : 'text-[#666660] hover:text-[#151515] hover:bg-[#F7F7F2]'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>4. Kịch Bản Thuyết Trình</span>
          </button>

          <button
            onClick={() => setActiveTab('testing')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testing'
                ? 'bg-[#151515] text-[#C7F464]'
                : 'text-[#666660] hover:text-[#151515] hover:bg-[#F7F7F2]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>5. Checklist Kiểm Thử</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex-1 text-xs sm:text-sm text-[#151515]">
          {/* TAB 1: FLOWCHART */}
          {activeTab === 'flowchart' && (
            <div className="space-y-6">
              <div className="bg-[#F7F7F2] p-4 rounded-2xl border border-[#151515]/10">
                <h3 className="font-display text-base font-bold text-[#151515] mb-1">
                  Sơ Đồ Luồng Nghiệp Vụ Đặt Hàng (Ordering Process Flowchart)
                </h3>
                <p className="text-xs text-[#666660]">
                  Thể hiện đầy đủ chu trình: Truy cập &rarr; Xem SP &rarr; Chọn size &rarr; Nhập thông tin &rarr; Validation (nhánh sai) &rarr; Xác nhận &rarr; Lưu Google Sheets (nhánh lỗi) &rarr; Kết quả.
                </p>
              </div>

              {/* Visual Flow Diagram */}
              <div className="border border-[#151515]/15 rounded-2xl p-4 sm:p-6 bg-white overflow-x-auto">
                <div className="min-w-[680px] flex flex-col items-center space-y-4">
                  {/* Step 1 */}
                  <div className="px-5 py-2.5 rounded-xl bg-[#151515] text-[#C7F464] font-bold text-xs text-center shadow-xs">
                    [1] Khách hàng truy cập website Teamy
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Step 2 */}
                  <div className="px-5 py-2.5 rounded-xl bg-[#F7F7F2] border border-[#151515]/20 font-semibold text-xs text-center">
                    [2] Xem danh mục: Cầu Lông · Tennis · Chạy Bộ & Tìm kiếm / Lọc giá
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Step 3 */}
                  <div className="px-5 py-2.5 rounded-xl bg-[#F7F7F2] border border-[#151515]/20 font-semibold text-xs text-center">
                    [3] Mở chi tiết sản phẩm & Chọn kích cỡ (Size 38-45) + Số lượng
                    <span className="block text-[11px] text-[#666660] mt-0.5">(Hệ thống chặn nếu size hết hàng hoặc chưa chọn size)</span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Step 4 */}
                  <div className="px-5 py-2.5 rounded-xl bg-[#F7F7F2] border border-[#151515]/20 font-semibold text-xs text-center">
                    [4] Thêm vào giỏ hàng &rarr; Tự động tính Tạm tính + Phí vận chuyển + Lưu LocalStorage
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Step 5 */}
                  <div className="px-5 py-2.5 rounded-xl bg-[#F7F7F2] border border-[#151515]/20 font-semibold text-xs text-center">
                    [5] Mở Biểu mẫu Checkout: Nhập Họ tên, SĐT, Địa chỉ, Phương thức thanh toán
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Decision Diamond 1: Validation */}
                  <div className="relative p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 max-w-md text-center">
                    <p className="font-bold text-xs text-amber-900">
                      [Kiểm tra tính hợp lệ dữ liệu (Form Validation)]
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-3 text-[11px]">
                      <div className="p-2 bg-red-100 text-red-800 rounded-lg text-left">
                        <strong>❌ Nhánh Sai:</strong>
                        <p className="mt-0.5">SĐT sai định dạng VN, thiếu họ tên hoặc địa chỉ &rarr; Báo lỗi inline, giữ nguyên dữ liệu đã nhập.</p>
                      </div>
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-left">
                        <strong>✅ Nhánh Đúng:</strong>
                        <p className="mt-0.5">Dữ liệu chuẩn xác &rarr; Chuyển sang bước Rà soát (Review) & Kích hoạt gửi đơn.</p>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Step 6: Dispatch */}
                  <div className="px-5 py-2.5 rounded-xl bg-[#F7F7F2] border border-[#151515]/20 font-semibold text-xs text-center">
                    [6] Gửi POST Request đến Google Apps Script (kèm requestId chống trùng)
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Decision Diamond 2: Server / Sheet Response */}
                  <div className="relative p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 max-w-md text-center">
                    <p className="font-bold text-xs text-blue-900">
                      [Máy chủ Google Apps Script xử lý & ghi Sheet]
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-3 text-[11px]">
                      <div className="p-2 bg-red-100 text-red-800 rounded-lg text-left">
                        <strong>❌ Lưu Thất Bại:</strong>
                        <p className="mt-0.5">Mạng ngắt / URL sai &rarr; Thông báo lỗi, KHÔNG xóa giỏ, cho phép người dùng ấn Thử lại.</p>
                      </div>
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-left">
                        <strong>✅ Lưu Thành Công:</strong>
                        <p className="mt-0.5">Tính lại giá server &rarr; Ghi các dòng vào Google Sheet &rarr; Phản hồi mã đơn TMY-XXXXXX.</p>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#151515] rotate-90" />

                  {/* Step 7: Success State */}
                  <div className="px-6 py-3 rounded-2xl bg-emerald-700 text-white font-bold text-xs text-center shadow-md">
                    [7] Hiển thị màn hình &quot;Teamy đã nhận đơn hàng của bạn!&quot;
                    <span className="block text-[11px] font-normal text-emerald-100 mt-1">
                      Cung cấp mã đơn, tóm tắt người nhận, tổng tiền & nút tiếp tục mua sắm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAPPING TABLE */}
          {activeTab === 'mapping' && (
            <div className="space-y-4">
              <div className="bg-[#F7F7F2] p-4 rounded-2xl border border-[#151515]/10">
                <h3 className="font-display text-base font-bold text-[#151515]">
                  Bảng Đối Chiếu Yêu Cầu Đề Bài & Chức Năng Đã Triển Khai
                </h3>
                <p className="text-xs text-[#666660] mt-0.5">
                  Đối chiếu 100% các tiêu chí bắt buộc theo đề môn học.
                </p>
              </div>

              <div className="overflow-x-auto border border-[#151515]/10 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151515] text-[#C7F464]">
                    <tr>
                      <th className="p-3 w-12 text-center">STT</th>
                      <th className="p-3 w-1/3">Yêu Cầu Từ Đề Bài</th>
                      <th className="p-3">Giải Pháp & Vị Trí Triển Khai Trên Website Teamy</th>
                      <th className="p-3 w-28 text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="p-3 text-center font-bold">1</td>
                      <td className="p-3 font-semibold">Đủ 3 nhóm sản phẩm: Cầu lông, Tennis, Chạy bộ</td>
                      <td className="p-3">Có 12 sản phẩm hoàn chỉnh (4 Cầu Lông, 4 Tennis, 4 Chạy Bộ) kèm thông số đặc thù, hình ảnh vector sắc nét và mô tả chuẩn thể thao.</td>
                      <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">Đạt 100%</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center font-bold">2</td>
                      <td className="p-3 font-semibold">Flowchart quy trình đặt hàng</td>
                      <td className="p-3">Sơ đồ tương tác chi tiết tại Tab 1 của cửa sổ này, có đầy đủ 2 nhánh dữ liệu sai và lưu thất bại.</td>
                      <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">Đạt 100%</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center font-bold">3</td>
                      <td className="p-3 font-semibold">Tên, logo cửa hàng, ảnh, tên SP, giá, mô tả, nút đặt mua</td>
                      <td className="p-3">Header có logo Teamy SVG; Card có ảnh, tên, giá format VND, mô tả, nút Xem chi tiết và nút Đặt mua trực tiếp.</td>
                      <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">Đạt 100%</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center font-bold">4</td>
                      <td className="p-3 font-semibold">Form: Họ tên, SĐT, Địa chỉ, SP đã chọn, Size, Số lượng, Phương thức TT</td>
                      <td className="p-3">Modal Checkout 2 bước tự động lấy sản phẩm/size/SL từ giỏ hàng; có trường Họ tên, SĐT VN, Địa chỉ chi tiết, Thanh toán COD & Chuyển khoản.</td>
                      <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">Đạt 100%</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center font-bold">5</td>
                      <td className="p-3 font-semibold">Thông báo đặt hàng thành công</td>
                      <td className="p-3">Màn hình thông báo hiện đại, có tick checkmark, mã đơn TMY-XXXXXX, thời gian, tóm tắt người nhận và tổng tiền đã lưu.</td>
                      <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">Đạt 100%</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-center font-bold">6</td>
                      <td className="p-3 font-semibold">Kết nối Google Sheets lưu đơn thực tế</td>
                      <td className="p-3">Cung cấp toàn bộ mã Apps Script 18 cột, tính lại giá máy chủ, chống formula injection, hỗ trợ dán URL Web App kiểm thử trực tiếp và chế độ demo minh họa.</td>
                      <td className="p-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">Đạt 100%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SHEETS GUIDE */}
          {activeTab === 'sheets-guide' && (
            <div className="space-y-6">
              <div className="bg-[#F7F7F2] p-4 rounded-2xl border border-[#151515]/10 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-[#151515]">
                    Hướng Dẫn Kết Nối Google Sheets & Google Apps Script
                  </h3>
                  <p className="text-xs text-[#666660]">
                    Các bước để tạo bảng tính trên Google Drive của bạn và kích hoạt Web App trong 3 phút.
                  </p>
                </div>
                <button
                  onClick={onOpenSheetsConfig}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
                >
                  Mở Bảng Cấu Hình &rarr;
                </button>
              </div>

              {/* 5 Steps */}
              <div className="space-y-4">
                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl">
                  <h4 className="font-bold text-sm text-[#151515] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#151515] text-[#C7F464] text-xs flex items-center justify-center">1</span>
                    Tạo bảng tính mới trên Google Sheets
                  </h4>
                  <p className="text-xs text-[#666660] mt-1">
                    Truy cập <strong>sheets.google.com</strong> &rarr; Tạo bảng tính mới &rarr; Đặt tên bảng tính là <code>Đơn Hàng Teamy</code>.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl">
                  <h4 className="font-bold text-sm text-[#151515] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#151515] text-[#C7F464] text-xs flex items-center justify-center">2</span>
                    Mở trình soạn thảo Google Apps Script
                  </h4>
                  <p className="text-xs text-[#666660] mt-1">
                    Trên thanh menu của Google Sheet, chọn: <strong>Tiện ích mở rộng (Extensions) &rarr; Apps Script</strong>.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#151515] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#151515] text-[#C7F464] text-xs flex items-center justify-center">3</span>
                      Dán mã nguồn Code.gs
                    </h4>
                    <button
                      onClick={handleCopyScript}
                      className="px-3 py-1 bg-[#151515] text-[#C7F464] rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Đã sao chép' : 'Sao chép mã'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#666660] mt-1">
                    Xóa toàn bộ nội dung mặc định trong tệp <code>Code.gs</code> và dán toàn bộ đoạn mã đã chuẩn bị sẵn vào. Nhấn <strong>Lưu (Ctrl + S)</strong>.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl">
                  <h4 className="font-bold text-sm text-[#151515] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#151515] text-[#C7F464] text-xs flex items-center justify-center">4</span>
                    Triển khai dưới dạng Ứng dụng Web (Web App)
                  </h4>
                  <p className="text-xs text-[#666660] mt-1">
                    Nhấn nút xanh <strong>Triển khai (Deploy) &rarr; Tùy chọn triển khai mới (New deployment)</strong>.
                  </p>
                  <ul className="list-disc list-inside mt-2 text-xs space-y-1 text-[#151515]">
                    <li>Chọn loại: <strong>Ứng dụng web (Web app)</strong></li>
                    <li>Thực thi dưới dạng (Execute as): <strong>Tôi (Tài khoản Google của bạn)</strong></li>
                    <li>Ai có quyền truy cập (Who has access): <strong>Bất kỳ ai (Anyone)</strong> <span className="text-red-600 font-semibold">(Bắt buộc để website có thể gửi đơn)</span></li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl">
                  <h4 className="font-bold text-sm text-[#151515] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#151515] text-[#C7F464] text-xs flex items-center justify-center">5</span>
                    Dán URL Web App vào Teamy
                  </h4>
                  <p className="text-xs text-[#666660] mt-1">
                    Sao chép đường link Web App (kết thúc bằng <code>/exec</code>) &rarr; Mở nút <strong>Sheets: Chế độ Demo</strong> ở góc phải trên website &rarr; Dán link và nhấn <strong>Kiểm tra kết nối</strong> &rarr; Lưu cấu hình.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRESENTATION SCRIPT */}
          {activeTab === 'presentation' && (
            <div className="space-y-4">
              <div className="bg-[#F7F7F2] p-4 rounded-2xl border border-[#151515]/10">
                <h3 className="font-display text-base font-bold text-[#151515]">
                  Kịch Bản Thuyết Trình Bài Tập (Thời Lượng 3 - 5 Phút)
                </h3>
                <p className="text-xs text-[#666660]">
                  Gợi ý trình bày báo cáo trước giảng viên và hội đồng môn học một cách thuyết phục và mạch lạc.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-white border border-[#151515]/10 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Phút 0:00 - 0:45</span>
                  <h4 className="font-bold text-sm text-[#151515] mt-0.5">1. Đặt vấn đề & Giới thiệu thương hiệu Teamy</h4>
                  <p className="text-xs text-[#666660] mt-1 leading-relaxed">
                    &quot;Kính thưa thầy/cô, website Teamy được xây dựng theo phong cách thương mại điện tử thể thao chuyên nghiệp với thông điệp &apos;Chạm nhịp chuyển động&apos;. Dự án phục vụ đầy đủ 3 bộ môn: Cầu lông, Tennis và Chạy bộ, áp dụng hệ thống màu trắng ngà #F7F7F2, chữ đen than #151515 và điểm nhấn xanh lime #C7F464.&quot;
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#151515]/10 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Phút 0:45 - 1:45</span>
                  <h4 className="font-bold text-sm text-[#151515] mt-0.5">2. Duyệt sản phẩm, tìm kiếm & chọn size</h4>
                  <p className="text-xs text-[#666660] mt-1 leading-relaxed">
                    &quot;Em xin phép thao tác lọc theo danh mục Giày Tennis và tìm kiếm từ khóa không dấu. Khi bấm xem mẫu Teamy Rally Pro, hệ thống mở cửa sổ chi tiết hỗ trợ phím Escape, hiển thị rõ số lượng tồn kho từng size, chặn size đã hết hàng và yêu cầu khách chọn size trước khi thêm vào giỏ.&quot;
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#151515]/10 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Phút 1:45 - 2:45</span>
                  <h4 className="font-bold text-sm text-[#151515] mt-0.5">3. Giỏ hàng & Điền thông tin Checkout</h4>
                  <p className="text-xs text-[#666660] mt-1 leading-relaxed">
                    &quot;Tại giỏ hàng, người dùng có thể tăng/giảm số lượng, kiểm tra chính sách miễn phí giao hàng trên 1.500.000 ₫ và chuyển qua màn hình đặt hàng. Em sẽ cố tình nhập số điện thoại sai định dạng để chứng minh tính năng Validation hoạt động. Sau đó nhập đúng, nhấn Xem lại và Xác nhận đặt hàng.&quot;
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-[#151515]/10 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Phút 2:45 - 4:00</span>
                  <h4 className="font-bold text-sm text-[#151515] mt-0.5">4. Lưu dữ liệu vào Google Sheets & Đối chiếu</h4>
                  <p className="text-xs text-[#666660] mt-1 leading-relaxed">
                    &quot;Sau khi bấm xác nhận, hệ thống gửi dữ liệu POST đến Google Apps Script. Em xin phép chuyển sang tab Google Sheet để thầy/cô thấy dòng đơn hàng vừa được ghi nhận lập tức với đầy đủ 18 cột, mã đơn TMY và giá đã được kiểm tra tính toán lại từ phía server để chống can thiệp giá.&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TESTING CHECKLIST */}
          {activeTab === 'testing' && (
            <div className="space-y-4">
              <div className="bg-[#F7F7F2] p-4 rounded-2xl border border-[#151515]/10">
                <h3 className="font-display text-base font-bold text-[#151515]">
                  Checklist Kiểm Thử Trước Khi Bàn Giao
                </h3>
                <p className="text-xs text-[#666660]">
                  Danh sách các kịch bản kiểm tra độ tin cậy của ứng dụng trên cả Desktop và Điện thoại di động.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl space-y-2">
                  <h4 className="font-bold text-sm text-[#151515] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Kịch Bản Trên Máy Tính (Desktop)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#666660]">
                    <li>• Sticky header chuyển nền mờ khi cuộn trang.</li>
                    <li>• Bấm các nút danh mục Cầu Lông/Tennis/Chạy bộ cuộn đúng chỗ và tự động lọc danh sách.</li>
                    <li>• Tìm kiếm không dấu &quot;cau long&quot; tìm thấy kết quả tiếng Việt.</li>
                    <li>• Mở modal chi tiết bằng chuột hoặc bàn phím, đóng bằng Escape.</li>
                    <li>• Chặn bấm &quot;Thêm vào giỏ&quot; khi chưa chọn size hoặc size có stock = 0.</li>
                    <li>• Kiểm tra F5 tải lại trang: Giỏ hàng trong LocalStorage vẫn nguyên vẹn.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-[#151515]/10 rounded-2xl space-y-2">
                  <h4 className="font-bold text-sm text-[#151515] flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Kịch Bản Trên Điện Thoại (Mobile)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#666660]">
                    <li>• Menu hamburger mở trượt êm ái, đóng khi chọn mục.</li>
                    <li>• Không có tình trạng tràn ngang (horizontal scroll) ở màn hình 360px.</li>
                    <li>• Bàn phím số tự động hiển thị khi nhập trường Số điện thoại.</li>
                    <li>• Form checkout hiển thị dạng xếp chồng 1 cột rõ ràng, nút bấm lớn hơn 44px.</li>
                    <li>• Tôn trọng chế độ giảm chuyển động (prefers-reduced-motion) nếu người dùng bật trên thiết bị.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-[#151515]/10 bg-[#F7F7F2] flex items-center justify-between text-xs text-[#666660]">
          <span>Phiên bản tài liệu học phần: v1.0.0 · Teamy E-Commerce</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#151515] text-[#C7F464] font-bold rounded-xl hover:bg-black cursor-pointer"
          >
            Đóng Tài Liệu
          </button>
        </div>
      </div>
    </div>
  );
};
