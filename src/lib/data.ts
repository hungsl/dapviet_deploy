// export const initialMessage = {
//   role: "system",
//   content: `
//      Bạn đang trò chuyện với chatbot hỗ trợ mua sắm trên website chuyên cung cấp Việt phục truyền thống. Dưới đây là các thông tin cơ bản về website:
//      ** Giới thiệu:**
//      - Đắp Việt là một nền tảng thương mại điện tử chuyên cung cấp Việt Phục cách tân. Dự án ra đời với mong muốn đưa Việt Phục trở thành một lựa chọn thời trang phổ biến cho giới trẻ, đặc biệt trong các dịp lễ Tết, chụp ảnh, đi lễ hội hoặc tham dự sự kiện văn hóa.
     
//      **Đắp Việt có những điểm mạnh sau giúp bạn an tâm khi lựa chọn:**
//       Chất liệu cao cấp: Đảm bảo sự thẩm mỹ, thoải mái khi mặc.
//       Giá cả hợp lý: Không quá đắt như thương hiệu cao cấp nhưng vẫn đảm bảo chất lượng Việt phục.
//       Thợ may chuyên môn cao: Đội ngũ thợ may giàu kinh nghiệm, chuyên may Việt phục.
//       Phong cách độc đáo: Việt phục cách tân Thiều Hoa kết hợp hài hòa giữa truyền thống và hiện đại.
//       Hệ thống truyền thông mạnh mẽ: Hoạt động sôi nổi trên Fanpage, TikTok, giúp khách hàng cập nhật mẫu mới dễ dàng.

//      **1. Cách mua Việt phục:**
//      - Chọn sản phẩm, thêm vào giỏ hàng, điền thông tin, chọn phương thức thanh toán và vận chuyển, kiểm tra và thanh toán.
 
//      **2. Phương thức thanh toán:**
//      - Chuyển khoản ngân hàng qua mã QR trên website (không mất phí thu hộ nếu có).
//      - Thanh toán khi nhận hàng (COD) (có thể mất phí thu hộ).
 
//      **3. Hủy đơn hàng:**
//      - Có thể hủy nếu đơn hàng đang xử lý bằng cách liên hệ với chúng tôi.
 
//      **4. Thông tin liên lạc:**
//      - Email: nextrad.dapviet@gmail.com
//      - Facebook cung cấp link này cho người dùng https://www.facebook.com/DongQuanTram.HongNhienVu?mibextid=kFxxJD
//      - Số điện thoại: 0846 533 850
//      - Tiktok cung cấp link này cho người dùng : https://www.tiktok.com/@elysian.raiment?_t=ZS-8t240NGgHWq&_r=1
     
//      **6. Theo dõi giao hàng:**
//      - Sau khi đặt hàng, sẽ nhận được email xác nhận và mã vận chuyển. Theo dõi thông qua mục đơn hàng trên web.
 
//      **7. Chương trình khuyến mãi:**
//      - Giảm giá sẽ được cấp nhật theo từng giai đoạn khác nhau.
 
//      **8. Thay đổi địa chỉ giao hàng:**
//      - Có thể thay đổi địa chỉ trong trạng thái đang xử lý bằng cách liên hệ ngay.
 
//      **9. Chọn kích cỡ Việt phục:**
//      - Trang sản phẩm có bảng kích cỡ chi tiết. Liên hệ hỗ trợ nếu cần tư vấn thêm.
 
//      **11. Chính sách trả hàng:**
//      - Trả lại sản phẩm trong vòng 7 ngày nếu không đúng mô tả hoặc hư hỏng, với điều kiện chưa sử dụng. Quay video mở hộp để được hỗ trợ.
 
//      **12. Hỗ trợ ngôn ngữ:**
//      - Hiện tại hỗ trợ tiếng Việt, và sẽ mở rộng thêm các ngôn ngữ khác trong tương lai.
 
//      **13. Thanh toán không thành công:**
//      - Đừng lo lắng ! Liên hệ với chúng tôi và cung cấp nội dung chuyển khoản để kiểm tra và xử lý.

//      Nếu cần hỗ trợ, hãy đặt câu hỏi và Đắp Việt AI sẽ giúp bạn.
//    `,
// };

const websiteSections = [
  {
    id: "gioi-thieu",
    content:
      "Đắp Việt là nền tảng thương mại điện tử chuyên cung cấp Việt phục truyền thống. Dự án ra đời với mong muốn đưa Việt phục trở thành một lựa chọn thời trang phổ biến cho giới trẻ, đặc biệt trong các dịp lễ Tết, chụp ảnh, đi lễ hội hoặc tham dự sự kiện văn hóa.",
  },
  {
    id: "diem-manh",
    content:
      "Đắp Việt có những điểm mạnh giúp khách hàng an tâm khi lựa chọn: \n- Chất liệu cao cấp, đảm bảo sự thẩm mỹ và thoải mái.\n- Giá cả hợp lý, không quá đắt như thương hiệu cao cấp nhưng vẫn đảm bảo chất lượng.\n- Đội ngũ thợ may chuyên môn cao, giàu kinh nghiệm.\n- Phong cách độc đáo: Việt phục cách tân Thiều Hoa kết hợp hài hòa giữa truyền thống và hiện đại.\n- Hệ thống truyền thông mạnh mẽ, hoạt động sôi nổi trên Fanpage và TikTok.",
  },
  {
    id: "mua-hang",
    content:
      "Cách mua Việt phục: \n1. Chọn sản phẩm\n2. Thêm vào giỏ hàng\n3. Điền thông tin\n4. Chọn phương thức thanh toán và vận chuyển\n5. Kiểm tra và thanh toán.",
  },
  {
    id: "thanh-toan",
    content:
      "Phương thức thanh toán: \n- Chuyển khoản ngân hàng qua mã QR trên website (không mất phí thu hộ nếu có).\n- Thanh toán khi nhận hàng (COD) (có thể mất phí thu hộ).",
  },
  {
    id: "huy-don-hang",
    content:
      "Hủy đơn hàng: \n- Có thể hủy nếu đơn hàng đang xử lý bằng cách liên hệ với chúng tôi.",
  },
  {
    id: "lien-he",
    content:
      "Thông tin liên hệ: \n- Email: nextrad.dapviet@gmail.com\n- Facebook: https://www.facebook.com/DongQuanTram.HongNhienVu?mibextid=kFxxJD\n- Số điện thoại: 0846 533 850\n- TikTok: https://www.tiktok.com/@elysian.raiment?_t=ZS-8t240NGgHWq&_r=1",
  },
  {
    id: "theo-doi-don-hang",
    content:
      "Theo dõi giao hàng: \n- Sau khi đặt hàng, khách hàng sẽ nhận được email xác nhận và mã vận chuyển. \n- Có thể theo dõi đơn hàng qua website.",
  },
  {
    id: "khuyen-mai",
    content:
      "Chương trình khuyến mãi: \n- Giảm giá sẽ được cập nhật theo từng giai đoạn.",
  },
  {
    id: "thay-doi-dia-chi",
    content:
      "Thay đổi địa chỉ giao hàng: \n- Có thể thay đổi địa chỉ trong trạng thái 'đang xử lý' bằng cách liên hệ ngay.",
  },
  {
    id: "chon-kich-co",
    content:
      "Chọn kích cỡ Việt phục: \n- Trang sản phẩm có bảng kích cỡ chi tiết. \n- Nếu cần tư vấn thêm, hãy liên hệ hỗ trợ.",
  },
  {
    id: "chinh-sach-doi-tra",
    content:
      "Chính sách trả hàng: \n- Trả lại sản phẩm trong vòng 7 ngày nếu không đúng mô tả hoặc hư hỏng. \n- Điều kiện: Sản phẩm chưa qua sử dụng, có video mở hộp.",
  },
  {
    id: "ho-tro-ngon-ngu",
    content:
      "Hỗ trợ ngôn ngữ: \n- Hiện tại hỗ trợ tiếng Việt. \n- Sẽ mở rộng thêm các ngôn ngữ khác trong tương lai.",
  },
  {
    id: "loi-thanh-toan",
    content:
      "Thanh toán không thành công: \n- Đừng lo lắng! Liên hệ với chúng tôi và cung cấp nội dung chuyển khoản để kiểm tra và xử lý.",
  },
];

export default websiteSections;
