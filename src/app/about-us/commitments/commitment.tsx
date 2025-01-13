import React from 'react';
import styles from './Commitments.module.css';
import { CommitmentItem } from './commit-item';

const commitmentData = {
  heading: "Với tâm huyết giữ gìn và phát triển giá trị văn hóa Việt chúng tôi cam kết",
  items: [
    {
      number: "1",
      title: "Sáng tạo và tôn trọng truyền thống",
      description: "Mỗi sản phẩm đều được thiết kế tỉ mỉ, vừa giữ nguyên hồn cốt Việt Phục, vừa phù hợp với nhu cầu hiện đại."
    },
    {
      number: "2",
      title: "Chất lượng vượt trội vượt mong đợi",
      description: "Từng chi tiết, từ chất liệu vải đến kỹ thuật may, đều được chúng tôi chọn lọc kỹ lưỡng để mang đến sự hoàn hảo trong từng đường nét"
    },
    {
      number: "3",
      title: "Lan tỏa văn hóa, kết nối tinh hoa",
      description: "Việt Phục không chỉ là trang phục, mà còn là biểu tượng cho niềm tự hào dân tộc, giúp bạn thể hiện cá tính và tình yêu dành cho văn hóa Việt Nam."
    }
  ]
};

export const Commitments: React.FC = () => {
  return (
    <section className={`${styles.commitmentSection}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{commitmentData.heading}</h2>
        <div className={styles.itemsGrid}>
          {commitmentData.items.map((item, index) => (
            <CommitmentItem
              key={index}
              number={item.number}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};