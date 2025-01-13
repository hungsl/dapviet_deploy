import React from 'react';
import styles from './VietnamDress.module.css';
import { ContentSection } from './content-section';
import { ImageGallery } from './img-gallary';
import Image from 'next/image';

const historicalImages = [
  { src: "/about/leffthistory.png", alt: "Historical Vietnamese dress from early period" },
  { src: "/about/midlehistory.png", alt: "Traditional Vietnamese clothing from middle period" },
  { src: "/about/righthistory.png", alt: "Evolution of Vietnamese dress in later period" }
];

export const VietnamDress: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.historicalSection}>
        <div className={styles.content}>
          <ContentSection
            title="Việt Phục Qua Các Thời Kỳ"
            description="Việt Phục, trang phục truyền thống của người Việt, đã trải qua nhiều thay đổi qua các thời kỳ lịch sử, mang đậm dấu ấn văn hóa và lịch sử dân tộc."
          />
          <ImageGallery images={historicalImages} />
        </div>
      </section>

      <section className={styles.modernSection}>
        <div className={styles.twoColumnLayout}>
          <div className={styles.textColumn}>
            <ContentSection
              title="Vẻ Đẹp Hào Hùng Của Việt Phục"
              description="Trong vài năm gần đây, phong trào phục dựng và ứng dụng cổ phục Việt đã lan tỏa mạnh mẽ, đặc biệt là trong giới trẻ. Cổ phục không chỉ là trang phục, mà còn là biểu tượng của niềm tự hào dân tộc, mang lại sự kết nối giữa quá khứ và hiện tại. Từ những ngày cuối tuần tại khu di tích Hoàng thành Thăng Long, cho đến các sự kiện, triển lãm văn hóa, cổ phục Việt đang trở thành cầu nối đưa vẻ đẹp truyền thống đến gần hơn với công chúng và du khách quốc tế. Những bộ trang phục này không chỉ tái hiện lại lịch sử, mà còn là niềm tự hào văn hóa, khẳng định sức sống mãnh liệt của di sản Việt Nam."
            />
          </div>
          <div className={styles.imageColumn}>
            <Image
              loading="lazy"
              width={500}
              height={500}
              quality={100}
              src="/about/trangphuctruyenhong.jpg"
              alt="Modern interpretation of Vietnamese traditional dress"
              className={styles.modernImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};