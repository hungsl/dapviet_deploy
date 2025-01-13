import React from "react";
import styles from "./UserDetail.module.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import accountApiRequest from "@/apiRequests/account";
import { Separator } from "@/components/ui/separator";

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const unwrappedParams = await params;

  let userData;
  try {
    const result = await accountApiRequest.userDetail(
      unwrappedParams.id,
      accessToken?.value || ""
    );
    // console.log("userDetail: ", result);
    userData = result.payload.data;
  } catch (error) {
    console.log("lỗi lấy chi tiết người dùng: ", error)
    redirect("/homepage");
  }

  return (
    <div className={styles.productContainer}>
      <Link
        href={"/staff/manage-user"}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Trở lại danh sách</span>
      </Link>
      <div className={styles.container}>
        <h1 className={styles.title}>Thông tin chi tiết người dùng</h1>
        <Separator />
        <div className={`${styles.profile} scroll`}>
          <div className={styles.avatar}>
            <img
              src={userData.avatar || "/default-avatar.png"}
              alt={userData.name || "Avatar"}
              className={styles.image}
            />
            <div className={styles.details}>
              <div className={styles.infotitle}>Thông tin cá nhân</div>
              <Separator />
              <p>
                <strong>Tên: </strong>
                {userData.name}
              </p>
              <p>
                <strong>Ngày sinh: </strong>
                {new Date(userData.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Giới tính: </strong>
                {userData.gender}
              </p>
            </div>
          </div>
          <div className={styles.details}>
            <p>
              <strong>Trạng thái: </strong>
              <span
                className={`${styles.status} ${styles[userData.status.toLowerCase()]}`}
              >
                {userData.status}
              </span>
            </p>

            <p>
              <strong>Email: </strong>
              {userData.email}
            </p>
            <p>
              <strong>Số điện thoại: </strong>
              {userData.phone}
            </p>
            <p>
              <strong>Địa chỉ: </strong>
              {`${userData.address}, ${userData.district}, ${userData.province}`}
            </p>
            <p>
              <strong>Vai trò: </strong>
              {userData.role}
            </p>

            <p>
              <strong>Ngày tạo: </strong>
              {new Date(userData.createdDate).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật: </strong>
              {new Date(userData.updatedDate).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
