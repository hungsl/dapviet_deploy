"use client";
import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
// import ProfileImage from "./profile-image";
import { ProfileNoEdit } from "./profile-no-edit";
// import { ProfileForm } from "./profile-form";
import { usePopup } from "@/app/context/popup-provider";
import { dataInfo } from "./types";
// import { useLoading } from "@/app/context/loading-provider";
import accountApiRequest from "@/apiRequests/account";
import { UpdateProfileInfoType } from "@/schemaValidations/account.schema";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { MdEmail } from "react-icons/md";
import { useLoading } from "@/app/context/loading-provider";
import dynamic from "next/dynamic";


const MdEmail = dynamic(() => import("react-icons/md").then((mod) => mod.MdEmail), { ssr: false });
const ProfileFormLazy = dynamic(() => import('./profile-form'), { ssr: false })
const ProfileImage = dynamic(() => import('./profile-image'), { ssr: false })

export const ProfileHeader = () => {
  const [userData, setUserData] = useState<dataInfo>();
  const { openPopup, setContent } = usePopup();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { setLoading } = useLoading();
  const handleEdit = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    async function fetchData() {
      const result = await accountApiRequest.meClient();
      const { data } = result.payload;
      const Data: dataInfo = {
        id: data.id,
        name: data.name,
        dob: data.dob,
        gender: data.gender,
        email: data.email,
        province: data.province,
        district: data.district,
        address: data.address,
        phone: data.phone,
        avatar: data.avatar,
        role: data.role,
      };
      setUserData(Data);
      // console.log(data)
    }
    fetchData();
  }, [isEditing]);

  const handleCancel = () => {
    setIsEditing(false); // Đóng ProfileForm
  };

  const handleSave = async (value: UpdateProfileInfoType) => {
    // console.log(value);
    setLoading(true);
    try {
      const result = await accountApiRequest.updateMe(value);
      if (result?.payload?.message) {
        toast({
          description: result.payload.message,
          duration: 4000,
        });
      } else {
        toast({
          description: "Cập nhật thành công!",
          duration: 4000,
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        description: "Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };
  const handlePasswordChange = () => {
    setContent("changepassword");
    openPopup();
  };
  if (!userData) return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
  );
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.userInfo}>
          <ProfileImage userData={userData} />
          <div className={styles.userDetails}>
            <div className={`${styles.userName} text-foreground`}>
              {userData.name}
            </div>
            <div className="flex gap-2">
              <MdEmail  className={styles.iconEmail} color="skyblue"  />
              <div className={styles.userEmail}>{userData.email}</div>
            </div>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.passwordButton}
            onClick={handlePasswordChange}
            tabIndex={0}
          >
            Đổi mật khẩu
          </button>
          <button
            className={styles.editButton}
            onClick={handleEdit}
            tabIndex={0}
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
      {isEditing ? (
        <ProfileFormLazy
          userData={userData}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      ) : (
        <ProfileNoEdit userData={userData} />
      )}
    </>
  );
};
