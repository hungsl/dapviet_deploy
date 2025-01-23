"use client";
import React, { useEffect, useState } from "react";
import styles from "../customer/UserProfile.module.css";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem } from "../customer/sidebar/menu-item";
import Link from "next/link";
import authApiRequest from "@/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";

export const SidebarStaff: React.FC = ({}) => {
  const path = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Quản lý trạng thái thu hẹp
  const [activeItem, setActiveItem] = useState<string>(path);
  const menuItems = [
    {
      // icon: "/sidebar/dashboard.png",
      icon: "dashboard",
      id: "/staff/dashboard",
      label: "Thống kê",
    },
    {
      // icon: "/sidebar/quanlysanpham.png",
      icon: "manage-product",
      id: "/staff/manage-product",
      label: "Quản lý sản phẩm",
    },
    {
      // icon: "/sidebar/quanlydanhmucsanpham.png",
      icon: "manage-category",
      id: "/staff/manage-category",
      label: "Danh mục sản phẩm",
    },
    {
      // icon: "/sidebar/quanlysodo.png",
      icon: "manage-size",
      id: "/staff/manage-size",
      label: "Quản lý số đo",
    },
    {
      // icon: "/sidebar/quanlybosuutap.png",
      icon: "manage-collection",
      id: "/staff/manage-collection",
      label: "Quản lý bộ sưu tập",
    },
    {
      // icon: "/sidebar/quanlydonhang.png",
      icon: "manage-order",
      id: "/staff/manage-order",
      label: "Quản lý đơn hàng",
    },
    {
      // icon: "/sidebar/quanlydanhthu.png",
      icon: "manage-revenue",
      id: "/staff/manage-revenue",
      label: "Báo cáo doanh thu",
    },
    {
      // icon: "/sidebar/quanlynguoidung.png",
      icon: "manage-user",
      id: "/staff/manage-user",
      label: "Quản lý người dùng",
    },
    {
      icon: "manage-payment",
      // icon: "/sidebar/quanlythanhtoan.png",
      id: "/staff/manage-payment",
      label: "Quản lý thanh toán",
    },
  ];

  const bottomMenuItems = [
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
      await authApiRequest.logoutFromNextClientToNextServer();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <div
      className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.sidebarContent}>
        <header className={styles.sidebarHeader}>
          <button
            className={styles.menuToggle}
            aria-label="Toggle menu"
            onClick={handleToggleSidebar}
          >
            <img
              loading="lazy"
              src="/sidebar/iconsidebar.png"
              className={styles.menuToggleIcon}
              alt=""
            />
          </button>
          <div
            className={`${styles.logoWrapper} ${isSidebarCollapsed ? styles.collapsed : ""}`}
          >
            <div className={`${styles.logoText} cu no-pointer`}>Đắp Việt</div>
            <img
              loading="lazy"
              src="/logo.png"
              className={styles.logoImage}
              alt={`Đắp Việt logo`}
            />
          </div>
        </header>

        <nav className={styles.navigation}>
          <div className={styles.mainMenu}>
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
