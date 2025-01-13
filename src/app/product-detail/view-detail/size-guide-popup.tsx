import React from 'react'
import styles from "./SizeGuide.module.css"
type SizeGuidePopupProps = {
    togglePopup : ()=> void
}
export default function SizeGuidePopup({togglePopup} : SizeGuidePopupProps) {
  return (
    <div><div className={styles.popupOverlay}>
    <div className={styles.popupContent}>
      <button className={styles.closeButton} onClick={togglePopup}>
        &times;
      </button>
      <h2 className={styles.popupTitle}>Bảng Hướng Dẫn Chọn Size</h2>
      <table className={styles.sizeTable}>
        <thead>
          <tr>
            <th>Size</th>
            <th>Chiều Cao (cm)</th>
            <th>Cân Nặng (kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>150 - 160</td>
            <td>40 - 50</td>
          </tr>
          <tr>
            <td>M</td>
            <td>160 - 170</td>
            <td>50 - 60</td>
          </tr>
          <tr>
            <td>L</td>
            <td>170 - 180</td>
            <td>60 - 75</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>180 - 190</td>
            <td>75 - 90</td>
          </tr>
          <tr>
            <td>XXL</td>
            <td>190 - 200</td>
            <td>90 - 105</td>
          </tr>
        </tbody>
      </table>
      <p className={styles.note}>
        *Lưu ý: Bảng size trên chỉ mang tính chất tham khảo. Vui lòng lựa chọn size dựa trên số đo thực tế của bạn.
      </p>
    </div>
  </div></div>
  )
}
