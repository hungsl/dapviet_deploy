import React from "react";
import { AboutSection } from "./about-section";

export const About: React.FC = () => {
  const aboutContent = [
    {
      title: "Kết nối hiện đại và truyền thống qua Việt Phục",
      description:
        "Với tình yêu dành cho lịch sử và văn hóa dân tộc, nhóm sinh viên chúng tôi đã xây dựng Đắp Việt không chỉ để cung cấp những bộ Việt Phục chất lượng mà còn để tạo ra một không gian giúp mọi người hiểu rõ hơn về nét đẹp của trang phục truyền thống và câu chuyện lịch sử gắn liền với nó.",
    },
    {
      title: "",
      description:
        "Lấy cảm hứng từ Áo tấc - còn gọi là Áo ngũ thân tay thụng, một biểu tượng thanh lịch và trang nhã của thời Nguyễn, Đắp Việt mang đến phiên bản cách tân tinh tế, vừa vặn với nhịp sống hiện đại nhưng vẫn giữ trọn hồn túy truyền thống",
    },
    {
      title: "",
      description:
        "Hãy cùng chúng tôi khám phá, trải nghiệm và lan tỏa tinh hoa Việt Phục – biểu tượng của niềm tự hào dân tộc.",
    },
  ];

  return (
    <AboutSection
      content={aboutContent}
      tagline="Đắp Việt – Lưu giữ hồn Việt, gắn kết quá khứ và hiện tại."
      imageSrc="/about/viet-phuc-cach-tan-09.png"
    />
  );
};
