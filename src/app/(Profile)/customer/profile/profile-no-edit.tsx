import React from "react";
import styles from "./UserProfile.module.css";
import { ProfileFormProps } from "./types";
import { ProfileField } from "./profile-field";
export const ProfileNoEdit: React.FC<ProfileFormProps> = ({
  userData,
}) => {
  const translateGender = (gender :string) => {
    switch (gender) {
      case "MALE":
        return "Nam";
      case "FEMALE":
        return "Nữ";
      case "OTHER":
        return "Khác";
      default:
        return ""; // Trả về chuỗi rỗng nếu không có giá trị
    }
  };
  return (
    <div className={`${styles.formContainers}`}>
      <div className={styles.formSection}>
        <div className="flex justify-around">
          <h2 className={`${styles.sectionTitle} text-foreground`}>Thông tin cá nhân</h2>
          <h2 className={`${styles.sectionTitle} text-foreground`}>Thông tin liên lạc</h2>
        </div>
        <div className={`flex justify-around ${styles.Noeditfield}`}>
          <div>
            <ProfileField label="Họ và tên" value={userData.name} />
            <ProfileField label="Ngày sinh" value={new Date(userData.dob).toLocaleDateString('vi-VN')} />
            <ProfileField label="Giới tính" value={translateGender(userData.gender)} />
          </div>
          <div>
            <ProfileField label="Số điện thoại" value={userData.phone} />
            <ProfileField label="Thành phố" value={userData.province} />
            <ProfileField label="Quận/Huyện" value={userData.district} />
            <ProfileField label="Địa chỉ" value={userData.address} />
          </div>
        </div>
      </div>
    </div>
  );
};
