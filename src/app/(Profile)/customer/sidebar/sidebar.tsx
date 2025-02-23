"use client";
import React, { useEffect, useState } from "react";
import styles from "../UserProfile.module.css";
import { MenuItem } from "./menu-item";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import authApiRequest from "@/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
import Image from "next/image";
import { useLoading } from "@/app/context/loading-provider";
import { AlignJustify, ChevronLeft, ChevronRight } from "lucide-react";

export const Sidebar: React.FC = ({}) => {
  const path = usePathname();
  const { setLoading } = useLoading();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Quản lý trạng thái thu hẹp
  const [activeItem, setActiveItem] = useState<string>(path);
  const menuItems = [
    {
      // icon: "/sidebar/profile.png",
      icon: "profile",
      id: "/customer/profile",
      label: "Thông tin cá nhân",
    },
    {
      // icon: "/sidebar/iconlichsumuahang.png",
      icon: "history",
      id: "/customer/history",
      label: "Lịch sử mua hàng",
    },
    // { icon: "/sidebar/loveicon.png", id: '/customer/favorites', label: "Sản phẩm yêu thích" },
    // { icon: "/sidebar/feedbackicon.png", id: '/customer/feedback', label: "Đánh giá sản phẩm" },
    {
      // icon: "/sidebar/donhangicon.png",
      icon: "order",
      id: "/customer/order",
      label: "Đơn hàng",
    },
    {
      // icon: "/sidebar/thanhtoan2.png",
      icon: "payment",
      id: "/customer/payment",
      label: "Thanh toán",
    },
  ];
  const bottomMenuItems = [
    // { icon: "/sidebar/dangxuaticon.png", id: "/logout", label: "Đăng xuất" },
    { icon: "logout", id: "/logout", label: "Đăng xuất" },
  ];
  useEffect(() => {
    setActiveItem(path);
  }, [path]);
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev); // Chuyển đổi trạng thái
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      await authApiRequest.logoutFromNextClientToNextServer();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/homepage");
      // router.push('/login')
    } catch (error) {
      handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`${styles.sidebar} bg-background ${isSidebarCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.sidebarContent}>
        <header className={styles.sidebarHeader}>
          <button
            className={styles.menuToggle}
            aria-label="Toggle menu"
            onClick={handleToggleSidebar}
          >
            {/* <Image
              width={300}
              height={300}
              priority
              src="/sidebar/iconsidebar.png"
              className={styles.menuToggleIcon}
              alt=""
            /> */}
            {isSidebarCollapsed ? (
              <>
                <AlignJustify />
                <ChevronRight />{" "}
              </>
            ) : (
              <>
                <AlignJustify />
                <ChevronLeft />
              </>
            )}
          </button>
          <div
            className={`${styles.logoWrapper} ${isSidebarCollapsed ? styles.collapsed : ""}`}
          >
            <Link prefetch href={"/homepage"} className={styles.logoText}>
              Đắp Việt
            </Link>
            <Image
              width={300}
              height={300}
              priority
              src="/logo.png"
              className={styles.logoImage}
              alt={`Đắp Việt logo`}
            />
          </div>
        </header>

        <nav className={styles.navigation}>
          <div className={`${styles.mainMenu} text-foreground`}>
            {menuItems.map((item, index) => (
              <Link prefetch href={item.id} key={index}>
                <MenuItem
                  {...item}
                  activeItem={activeItem}
                  isSidebarCollapsed={isSidebarCollapsed}
                />
              </Link>
            ))}
          </div>

          <div className={`${styles.bottomMenu} text-foreground`}>
            {bottomMenuItems.map((item) => (
              <MenuItem
                key={item.id}
                {...item}
                activeItem={activeItem}
                isSidebarCollapsed={isSidebarCollapsed}
                onClick={handleLogout}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};
