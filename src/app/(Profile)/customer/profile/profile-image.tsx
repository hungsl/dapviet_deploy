"use client";
import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import { toast } from "@/hooks/use-toast";
import accountApiRequest from "@/apiRequests/account";
import { deleteImage, uploadImage } from "@/supabase/storage/client";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/context/loading-provider";
import { dataInfo } from "./types";

export default function ProfileImage({ userData }: { userData : dataInfo }) {
  const { setLoading } = useLoading();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const handleImageClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Giải phóng URL
      setPreviewUrl("");
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const preview = URL.createObjectURL(file); // Tạo URL xem trước
      setPreviewUrl(preview); // Lưu URL vào state
    }
    setSelectedFile(file);
  };

  const UploadImage = async () => {
    if (!selectedFile) {
      toast({
        description: "Vui lòng chọn một tệp trước khi cập nhật.",
        duration: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      const { imageUrl, error } = await uploadImage({
        file: selectedFile,
        bucket: "hung-pics",
      });
      if (error) {
        console.error(error);
        setLoading(false); // Đặt loading = false nếu có lỗi
        return;
      }
      // console.log("Uploading file:", imageUrl);
      const body = {
        avatar: imageUrl,
      };
      await accountApiRequest.updateImg(body);
      if (userData?.avatar.includes("/storage/v1/object/public/")) {
        const { data, error } = await deleteImage(userData.avatar);
        console.log(data);
        console.log(error);
        // console.log("URL xoa trong DB.");
      } else {
        // console.log("URL Không có trong DB.");
      }
      closeModal();
      router.refresh();
      toast({
        description: "Cập nhật ảnh thành công",
        duration: 3000,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false); // Đặt loading = false sau khi hoàn thành
    }
  };
  return (
    <div className={styles.imageContainer}>
      <img
        loading="lazy"
        src={userData?.avatar ? userData.avatar : "/userProfile.png"}
        alt={`${userData?.name}'s profile`}
        className={styles.profileImage}
        onClick={handleImageClick}
      />
      <div className={styles.overlay} onClick={handleImageClick}>
        Thay đổi ảnh
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Tải ảnh mới</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            {(userData?.avatar || previewUrl) && (
              <div className={styles.imagePreviewContainer}>
                <img
                  src={previewUrl !== "" ? previewUrl : userData?.avatar || ""}
                  alt="Xem trước ảnh"
                  className={styles.imagePreview}
                />
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={closeModal} className={styles.closeButton}>
                Đóng
              </button>
              <button onClick={UploadImage} className={styles.saveButton}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
