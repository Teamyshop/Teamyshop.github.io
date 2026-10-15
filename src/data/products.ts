import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- GIÀY CẦU LÔNG ---
  {
    id: 'tmy-bl-01',
    name: 'Teamy Court Swift',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    subTypeVi: 'Sân Thảm Tiêu Chuẩn',
    price: 1850000,
    originalPrice: 2150000,
    tagline: 'Tốc độ tối đa, chuyển hướng thanh thoát trên từng nhịp cầu.',
    description: 'Thiết kế khí động học chuyên biệt cho các pha di chuyển bước chéo và bật nhảy đập cầu. Đế cao su non-marking nguyên khối bám dính tuyệt đối trên sân thảm PVC và sàn gỗ nhà thi đấu.',
    features: [
      'Đế cao su kép non-marking chống trượt xoay 360 độ',
      'Đệm gót Power-Rebound hấp thu xung lực khi tiếp đất',
      'Thân giày lưới dệt tổ ong thoáng khí 3 lớp',
      'Khung TPU chống lật cổ chân khi cứu cầu góc xa'
    ],
    specs: {
      upper: 'Vải dệt Mesh ép nhiệt TPU siêu nhẹ',
      midsole: 'Đệm EVA nén đa mật độ giảm chấn',
      outsole: 'Cao su tự nhiên non-marking hoa văn tổ ong',
      weight: '295g (Size 41)',
      courtType: 'Sân thảm chuyên dụng / Sân sàn gỗ'
    },
    sizes: [
      { size: 38, stock: 4 },
      { size: 39, stock: 6 },
      { size: 40, stock: 12 },
      { size: 41, stock: 15 },
      { size: 42, stock: 8 },
      { size: 43, stock: 5 },
      { size: 44, stock: 2 },
      { size: 45, stock: 0 } // hết hàng để test
    ],
    colorScheme: {
      primary: '#151515',
      accent: '#C7F464',
      sole: '#E2E8F0',
      label: 'Obsidian / Electric Lime'
    },
    featured: true
  },
  {
    id: 'tmy-bl-02',
    name: 'Teamy Aero Smash',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    subTypeVi: 'Lực Bật Smash & Tấn Công',
    price: 2190000,
    originalPrice: 2490000,
    tagline: 'Bật cao uy lực, tiếp đất êm ái cùng thanh ổn định Carbon.',
    description: 'Được gia cố bằng tấm sợi carbon ở giữa vòm bàn chân, hạn chế tối đa độ xoắn vặn khi đổi hướng đột ngột và tối ưu hóa lực đẩy khi bật smash.',
    features: [
      'Tấm lót vòm Carbon Plate chống vặn xoắn cấu trúc',
      'Công nghệ bọc mũi giày Hyper-Shield chống mài mòn khi miết chân',
      'Lưỡi gà liền mảnh hạn chế xê dịch khi thi đấu',
      'Đế ngoài rãnh rẽ quạt thoát mồ hôi sàn'
    ],
    specs: {
      upper: 'Da tổng hợp microfiber kết hợp lưới KPU',
      midsole: 'Đệm HyperBounce đàn hồi cao + Carbon shank',
      outsole: 'Cao su gum grip tiêu chuẩn BWF',
      weight: '310g (Size 41)',
      courtType: 'Sân thảm thi đấu'
    },
    sizes: [
      { size: 38, stock: 2 },
      { size: 39, stock: 5 },
      { size: 40, stock: 9 },
      { size: 41, stock: 11 },
      { size: 42, stock: 7 },
      { size: 43, stock: 4 },
      { size: 44, stock: 0 },
      { size: 45, stock: 0 }
    ],
    colorScheme: {
      primary: '#FFFFFF',
      accent: '#151515',
      sole: '#C7F464',
      label: 'Chalk White / Volt Accent'
    },
    featured: false
  },
  {
    id: 'tmy-bl-03',
    name: 'Teamy Feather Grip',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    subTypeVi: 'Phong Cách Linh Hoạt & Phòng Thủ',
    price: 1490000,
    tagline: 'Nhẹ như lông vũ, vững chắc trong từng pha phòng thủ phản tạt.',
    description: 'Dòng giày tập luyện và phong trào bán chạy nhất của Teamy. Trọng lượng tối ưu dưới 280g giúp đôi chân luôn nhẹ nhàng dù thi đấu liên tục 3 set.',
    features: [
      'Trọng lượng siêu nhẹ chỉ 278g',
      'Đế kép Non-Marking độ bền trên 18 tháng sử dụng',
      'Lót giày kháng khuẩn than hoạt tính khử mùi mồ hôi',
      'Cổ giày đệm mút hoạt tính ôm khít mắt cá'
    ],
    specs: {
      upper: 'Lưới thoáng khí 3D Mesh gia cố viền TPU',
      midsole: 'Light Foam đàn hồi tức thì',
      outsole: 'Cao su dẻo chịu ma sát cao',
      weight: '278g (Size 41)',
      courtType: 'Sân thảm / Sân đa năng / Xi măng láng'
    },
    sizes: [
      { size: 38, stock: 8 },
      { size: 39, stock: 10 },
      { size: 40, stock: 14 },
      { size: 41, stock: 18 },
      { size: 42, stock: 12 },
      { size: 43, stock: 6 },
      { size: 44, stock: 3 },
      { size: 45, stock: 2 }
    ],
    colorScheme: {
      primary: '#242424',
      accent: '#38BDF8',
      sole: '#E2E8F0',
      label: 'Deep Slate / Ice Cyan'
    },
    featured: false
  },
  {
    id: 'tmy-bl-04',
    name: 'Teamy Drive Max',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    subTypeVi: 'Hỗ Trợ Mắt Cá Chân Toàn Diện',
    price: 2450000,
    tagline: 'Vững vàng bảo vệ khớp cổ chân trong mọi tình huống tranh chấp trên lưới.',
    description: 'Phiên bản cao cấp dành cho vận động viên tìm kiếm sự bảo vệ tối đa. Đệm 3 lớp phân tán lực chấn động đến gót chân và mắt cá khi lùi sâu đánh quả cầu bổng.',
    features: [
      'Cấu trúc cổ chân 3D-Ankle Support giảm 40% nguy cơ lật sơ mi',
      'Đế giữa 3 tầng mút hấp thu dư chấn',
      'Rãnh xoay trợ lực phần mũi chân hỗ trợ bật bước ngang',
      'Vải dệt Nano kháng nước bề mặt nhẹ'
    ],
    specs: {
      upper: 'Da tổng hợp PU cao cấp ép khung kim loại ngầm',
      midsole: 'Hệ thống Tri-Foam đa tầng',
      outsole: 'Đế cao su chịu nhiệt độ ma sát cao',
      weight: '325g (Size 41)',
      courtType: 'Sân thảm chuyên dụng'
    },
    sizes: [
      { size: 39, stock: 3 },
      { size: 40, stock: 7 },
      { size: 41, stock: 8 },
      { size: 42, stock: 10 },
      { size: 43, stock: 5 },
      { size: 44, stock: 2 },
      { size: 45, stock: 1 },
      { size: 38, stock: 0 }
    ],
    colorScheme: {
      primary: '#0F172A',
      accent: '#C7F464',
      sole: '#151515',
      label: 'Midnight Navy / Lime Strike'
    },
    featured: false
  },

  // --- GIÀY TENNIS ---
  {
    id: 'tmy-tn-01',
    name: 'Teamy Rally Pro',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    subTypeVi: 'Mọi Loại Sân (All-Court)',
    price: 2290000,
    originalPrice: 2590000,
    tagline: 'Làm chủ từng pha bóng bền bỉ nơi vạch cuối sân (baseline).',
    description: 'Chuyên dụng cho các tay vợt thi đấu cường độ cao. Thanh nẹp sườn bên hông giày khóa chặt bàn chân khi trượt dừng gấp trên mặt sân cứng.',
    features: [
      'Khung nẹp sườn Lateral Wing chống xoắn trượt sang bên',
      'Vùng bọc mũi giày DragGuard chống thủng khi trượt gót',
      'Đế cao su đúc cứng cáp bảo hành chống mòn vượt trội',
      'Đệm OrthoLite khử mùi và êm ái suốt 5 set đấu'
    ],
    specs: {
      upper: 'Lưới bọc khung Polyurethane chịu va đập',
      midsole: 'Đệm EVA dập khuôn cao su chèn gel gót',
      outsole: 'Hợp chất cao su Teamy-DuraRub All-Court',
      weight: '360g (Size 41)',
      courtType: 'Sân cứng (Hard Court) / Sân tổng hợp'
    },
    sizes: [
      { size: 39, stock: 4 },
      { size: 40, stock: 8 },
      { size: 41, stock: 14 },
      { size: 42, stock: 12 },
      { size: 43, stock: 7 },
      { size: 44, stock: 3 },
      { size: 45, stock: 1 },
      { size: 38, stock: 0 }
    ],
    colorScheme: {
      primary: '#1E293B',
      accent: '#C7F464',
      sole: '#FFFFFF',
      label: 'Asphalt Slate / Lime Edge'
    },
    featured: true
  },
  {
    id: 'tmy-tn-02',
    name: 'Teamy Baseline Ace',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    subTypeVi: 'Độ Bền & Trượt Ổn Định',
    price: 2650000,
    tagline: 'Thiết kế nồi đồng cối đá cho những pha trượt cứu bóng hiểm hóc.',
    description: 'Phiên bản có độ bền cao nhất phân khúc. Gia cố chất liệu dẻo nhiệt trên toàn bộ má trong bàn chân để phục vụ các tay vợt có thói quen trượt sân cứng.',
    features: [
      'Gia cố má trong 4 lớp chống mòn ma sát',
      'Đế ngoài vân ziczac đa chiều phân bổ áp lực đều',
      'Hệ thống xỏ dây ngầm tránh đứt dây khi trượt',
      'Lót đệm nâng đỡ vòm chân người châu Á'
    ],
    specs: {
      upper: 'Vật liệu tổng hợp đúc nhiệt liền mạch',
      midsole: 'Đệm phản hồi năng lượng Air-Drive',
      outsole: 'Cao su siêu chịu mài mòn chuẩn Tour',
      weight: '375g (Size 41)',
      courtType: 'Sân cứng chuyên nghiệp'
    },
    sizes: [
      { size: 39, stock: 2 },
      { size: 40, stock: 6 },
      { size: 41, stock: 9 },
      { size: 42, stock: 11 },
      { size: 43, stock: 5 },
      { size: 44, stock: 2 },
      { size: 38, stock: 0 },
      { size: 45, stock: 0 }
    ],
    colorScheme: {
      primary: '#FFFFFF',
      accent: '#151515',
      sole: '#334155',
      label: 'Titanium White / Matte Black'
    },
    featured: false
  },
  {
    id: 'tmy-tn-03',
    name: 'Teamy Clay Master',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    subTypeVi: 'Chuyên Sân Đất Nện (Clay)',
    price: 1950000,
    originalPrice: 2200000,
    tagline: 'Rãnh xương cá sâu giúp vào đà và trượt đất nện chính xác từng centimet.',
    description: 'Thiết kế đế vân xương cá sâu 100% giúp thoát vụn đất đỏ dễ dàng, tạo độ bám tối đa khi tăng tốc và trượt dừng chuẩn xác mà không bị hẫng chân.',
    features: [
      'Đế ngoài xương cá Chevron sâu chuyên dụng sân đất nện',
      'Màng chống lọt cát mịn qua thân giày',
      'Trọng lượng tinh giản giảm bớt áp lực cơ bắp',
      'Cấu trúc ôm sát bàn chân chống xô lệch'
    ],
    specs: {
      upper: 'Lưới mắt nhỏ đan kín chống lọt bụi cát',
      midsole: 'Phylon đúc êm ái linh hoạt',
      outsole: 'Cao su vân xương cá Chevron thoát cát',
      weight: '340g (Size 41)',
      courtType: 'Sân đất nện (Clay Court)'
    },
    sizes: [
      { size: 38, stock: 3 },
      { size: 39, stock: 7 },
      { size: 40, stock: 10 },
      { size: 41, stock: 12 },
      { size: 42, stock: 8 },
      { size: 43, stock: 4 },
      { size: 44, stock: 2 },
      { size: 45, stock: 1 }
    ],
    colorScheme: {
      primary: '#B45309',
      accent: '#FDE047',
      sole: '#FFFFFF',
      label: 'Terracotta Clay / Solar Gold'
    },
    featured: false
  },
  {
    id: 'tmy-tn-04',
    name: 'Teamy Hardcourt Spin',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    subTypeVi: 'Tốc Độ & Xoay Trở Nhanh',
    price: 2100000,
    tagline: 'Nhẹ hơn, nhanh hơn cho lối đánh lên lưới tấn công đầy biến hóa.',
    description: 'Sự kết hợp giữa trọng lượng nhẹ của giày chạy và độ ổn định ngang của giày tennis. Giúp bạn di chuyển bao sân nhẹ nhàng và phản ứng tức thì.',
    features: [
      'Mặt đế phân chia 2 khoang tạo điểm tựa xoay chuyển linh hoạt',
      'Khung gót TPU định hình giữ gót vững chắc',
      'Dây thấu kính thắt chặt đều toàn bàn chân',
      'Đế giữa phản hồi lực nẩy nhanh'
    ],
    specs: {
      upper: 'Dệt kỹ thuật Engineered Mesh kết hợp TPU',
      midsole: 'Đệm SpeedLite siêu nhẹ',
      outsole: 'Cao su bám sàn cao cấp',
      weight: '335g (Size 41)',
      courtType: 'Sân cứng / Sân trải thảm nỉ'
    },
    sizes: [
      { size: 39, stock: 5 },
      { size: 40, stock: 8 },
      { size: 41, stock: 10 },
      { size: 42, stock: 9 },
      { size: 43, stock: 6 },
      { size: 44, stock: 3 },
      { size: 45, stock: 0 },
      { size: 38, stock: 2 }
    ],
    colorScheme: {
      primary: '#09090B',
      accent: '#C7F464',
      sole: '#E2E8F0',
      label: 'Pure Carbon / Neon Volt'
    },
    featured: false
  },

  // --- GIÀY CHẠY BỘ ---
  {
    id: 'tmy-rn-01',
    name: 'Teamy Run Flow',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    subTypeVi: 'Daily Trainer (Chạy Hằng Ngày)',
    price: 1690000,
    originalPrice: 1950000,
    tagline: 'Chạm nhịp chuyển động mượt mà trong từng bước chạy mỗi sớm mai.',
    description: 'Mẫu giày chạy đa năng được yêu thích nhất của Teamy. Đệm xốp bồng bềnh bảo vệ khớp gối tối đa từ những cự ly chạy khởi động 5K đến dài 21K.',
    features: [
      'Đế cong Rocker hình học tạo quán tính đẩy người về phía trước',
      'Lớp đệm xốp CloudFoam dày 32mm siêu êm ái',
      'Thân vải dệt nguyên khối co giãn ôm chân như một lớp tất',
      'Đế phủ cao su chịu mòn tại các điểm tiếp đất chính'
    ],
    specs: {
      upper: 'Vải dệt nguyên khối Jacquard thoáng khí',
      midsole: 'Bọt xốp nén CloudFoam thế hệ mới',
      outsole: 'Cao su chống trượt trên đường nhựa ướt',
      weight: '240g (Size 41)',
      courtType: 'Đường nhựa / Máy chạy bộ / Công viên'
    },
    sizes: [
      { size: 38, stock: 6 },
      { size: 39, stock: 11 },
      { size: 40, stock: 16 },
      { size: 41, stock: 20 },
      { size: 42, stock: 15 },
      { size: 43, stock: 8 },
      { size: 44, stock: 4 },
      { size: 45, stock: 3 }
    ],
    colorScheme: {
      primary: '#151515',
      accent: '#C7F464',
      sole: '#FFFFFF',
      label: 'Jet Black / Lime Stride'
    },
    featured: true
  },
  {
    id: 'tmy-rn-02',
    name: 'Teamy Pace Carbon',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    subTypeVi: 'Racing Marathon (Đế Đệm Carbon)',
    price: 2850000,
    originalPrice: 3200000,
    tagline: 'Vũ khí phá vỡ kỷ lục cá nhân (PB) trên đường chạy Marathon 42.195km.',
    description: 'Trang bị đĩa sợi carbon uốn cong toàn phần đặt giữa 2 lớp bọt PEBA cao cấp nhất. Cung cấp tỉ lệ hoàn trả năng lượng lên đến 87% qua từng nhịp sải chân.',
    features: [
      'Đĩa Carbon nguyên tấm uốn cong trợ lực bứt tốc',
      'Bọt PEBA siêu nhẹ hoàn trả năng lượng 87%',
      'Thân giày lưới Monomesh xuyên thấu siêu thoáng mát',
      'Trọng lượng lông vũ chỉ 198g cho cảm giác bay trên đường đua'
    ],
    specs: {
      upper: 'Vải lưới màng Monomesh chống tích tụ mồ hôi',
      midsole: 'Đệm PEBA hạt nở siêu nhẹ + Carbon Plate',
      outsole: 'Lớp phủ cao su mỏng bám đường ướt',
      weight: '198g (Size 41)',
      courtType: 'Đường đua Road Marathon / Bán Marathon'
    },
    sizes: [
      { size: 39, stock: 3 },
      { size: 40, stock: 6 },
      { size: 41, stock: 8 },
      { size: 42, stock: 7 },
      { size: 43, stock: 4 },
      { size: 44, stock: 1 },
      { size: 38, stock: 0 },
      { size: 45, stock: 0 }
    ],
    colorScheme: {
      primary: '#F8FAFC',
      accent: '#10B981',
      sole: '#C7F464',
      label: 'Glacier White / Hyper Lime'
    },
    featured: false
  },
  {
    id: 'tmy-rn-03',
    name: 'Teamy Stride Cloud',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    subTypeVi: 'Max Cushioning (Siêu Đệm Giảm Chấn)',
    price: 1790000,
    tagline: 'Cảm giác êm ái như dạo bước trên mây, bảo vệ đầu gối người mới bắt đầu.',
    description: 'Dành riêng cho những người chạy có bàn chân phẳng hoặc người mới nhập môn chạy bộ cần bảo vệ tối đa hệ xương khớp. Đế rộng tạo thăng bằng vững chãi.',
    features: [
      'Đế giữa dày 36mm phân tán lực phản hồi từ mặt đường',
      'Đế mở rộng hai bên bàn chân giúp tiếp đất vững vàng',
      'Cổ giày bọc mút nhung êm ái chống cọ xát gân Achilles',
      'Chi tiết phản quang 3M an toàn khi chạy đêm'
    ],
    specs: {
      upper: 'Lưới Engineered Mesh tái chế bảo vệ môi trường',
      midsole: 'Đệm CloudMax bọt kín 2 lớp',
      outsole: 'Đế cao su rãnh uốn lượn tự nhiên',
      weight: '265g (Size 41)',
      courtType: 'Đường phố / Công viên / Chạy phục hồi'
    },
    sizes: [
      { size: 38, stock: 5 },
      { size: 39, stock: 9 },
      { size: 40, stock: 14 },
      { size: 41, stock: 15 },
      { size: 42, stock: 11 },
      { size: 43, stock: 7 },
      { size: 44, stock: 3 },
      { size: 45, stock: 2 }
    ],
    colorScheme: {
      primary: '#334155',
      accent: '#F59E0B',
      sole: '#F1F5F9',
      label: 'Slate Grey / Amber Horizon'
    },
    featured: false
  },
  {
    id: 'tmy-rn-04',
    name: 'Teamy Trail Phantom',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    subTypeVi: 'Trail & Địa Hình Đồi Dốc',
    price: 2350000,
    originalPrice: 2600000,
    tagline: 'Chinh phục mọi cung đường mòn hiểm trở, trèo đèo lội suối tự tin.',
    description: 'Chuyên trị các cung đường chạy địa hình, bùn đất và sỏi đá. Đế gai cao su đúc 5mm bám đất chắc chắn cùng màng kháng nước nhẹ ngăn bụi bẩn.',
    features: [
      'Gai đế đa chiều sâu 5mm bám dính trên sỏi ướt và bùn lầy',
      'Mũi giày bọc cao su cứng bảo vệ ngón chân va quẹt đá răm',
      'Thân giày phủ lớp DWR kháng nước mưa nhẹ và sương mù',
      'Túi giấu dây giày trên lưỡi gà tránh vướng mắc cành cây'
    ],
    specs: {
      upper: 'Vải Ripstop chống rách phủ màng DWR kháng nước',
      midsole: 'Đệm TrailFoam chèn tấm chống đinh đá',
      outsole: 'Cao su đúc gai sâu 5mm siêu bám',
      weight: '290g (Size 41)',
      courtType: 'Đường mòn địa hình / Đồi núi / Sỏi đá'
    },
    sizes: [
      { size: 39, stock: 4 },
      { size: 40, stock: 7 },
      { size: 41, stock: 11 },
      { size: 42, stock: 10 },
      { size: 43, stock: 6 },
      { size: 44, stock: 2 },
      { size: 38, stock: 1 },
      { size: 45, stock: 0 }
    ],
    colorScheme: {
      primary: '#1C1917',
      accent: '#C7F464',
      sole: '#292524',
      label: 'Stealth Earth / Lime Trail'
    },
    featured: false
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    labelVi: 'Tất Cả Sản Phẩm',
    subtitleVi: 'Khám phá trọn bộ sưu tập thể thao Teamy'
  },
  {
    id: 'badminton',
    labelVi: 'Giày Cầu Lông',
    subtitleVi: 'Nhanh một nhịp. Vững một bước.',
    descriptionVi: 'Bám sàn tối đa, chống lật sơ mi và bật nhảy thanh thoát trên mọi sân thảm thi đấu.'
  },
  {
    id: 'tennis',
    labelVi: 'Giày Tennis',
    subtitleVi: 'Làm chủ từng pha bóng.',
    descriptionVi: 'Khung nẹp sườn vững chắc, đế chịu mài mòn cao hỗ trợ trượt dừng gấp nơi vạch cuối sân.'
  },
  {
    id: 'running',
    labelVi: 'Giày Chạy Bộ',
    subtitleVi: 'Đi xa hơn giới hạn.',
    descriptionVi: 'Đệm êm bảo vệ khớp gối, khí động học thanh thoát từ chạy nhẹ hằng ngày đến cự ly 42K.'
  }
] as const;

export const SHIPPING_POLICY = {
  freeShippingThreshold: 1500000,
  flatRate: 30000,
  descriptionVi: 'Miễn phí giao hàng toàn quốc cho đơn hàng từ 1.500.000 ₫. Phí cố định 30.000 ₫ cho đơn dưới 1.500.000 ₫.'
};
