"use client";
import React, { useEffect, useState } from "react";
import styles from "../customer/UserProfile.module.css";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem } from "../customer/sidebar/menu-item";
import Link from "next/link";
import authApiRequest from "@/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
import { AlignJustify, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"; // Icon mở rộng nhóm
import Image from "next/image";
import { useLoading } from "@/app/context/loading-provider";

export default function SidebarStaff() {
  const path = usePathname();
  const router = useRouter();
  const {setLoading} = useLoading()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Quản lý trạng thái thu hẹp
  const [activeItem, setActiveItem] = useState<string>(path);
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({}); // Trạng thái mở rộng nhóm

  const menuItems = [
    {
      // icon: "/sidebar/dashboard.png",
      icon: "dashboard",
      id: "/staff/dashboard",
      label: "Thống kê",
    },
    // {
    //   // icon: "/sidebar/quanlysanpham.png",
    //   icon: "manage-product",
    //   id: "/staff/manage-product",
    //   label: "Quản lý sản phẩm",
    // },
    // {
    //   // icon: "/sidebar/quanlydanhmucsanpham.png",
    //   icon: "manage-category",
    //   id: "/staff/manage-category",
    //   label: "Danh mục sản phẩm",
    // },
    // {
    //   // icon: "/sidebar/quanlysodo.png",
    //   icon: "manage-size",
    //   id: "/staff/manage-size",
    //   label: "Quản lý số đo",
    // },
    {
      // icon: "/sidebar/quanlydonhang.png",
      icon: "manage-order",
      id: "/staff/manage-order",
      label: "Quản lý đơn hàng",
    },
    {
      icon: "manage-product",
      label: "Sản phẩm",
      groupId: "products",
      children: [
        {
          id: "/staff/manage-product",
          label: "Quản lý sản phẩm",
          icon: "manage-product",
        },
        {
          id: "/staff/manage-category",
          label: "Danh mục sản phẩm",
          icon: "manage-category",
        },
        {
          id: "/staff/manage-size",
          label: "Quản lý số đo",
          icon: "manage-size",
        },
      ],
    },
    {
      // icon: "/sidebar/quanlybosuutap.png",
      icon: "manage-collection",
      id: "/staff/manage-collection",
      label: "Quản lý bộ sưu tập",
    },
    
    // {
    //   // icon: "/sidebar/quanlydanhthu.png",
    //   icon: "manage-revenue",
    //   id: "/staff/manage-revenue",
    //   label: "Báo cáo doanh thu",
    // },
    {
      // icon: "/sidebar/quanlynguoidung.png",
      icon: "manage-user",
      id: "/staff/manage-user",
      label: "Quản lý người dùng",
    },
    // {
    //   icon: "manage-payment",
    //   // icon: "/sidebar/quanlythanhtoan.png",
    //   id: "/staff/manage-payment",
    //   label: "Quản lý thanh toán",
    // },
  ];

  const bottomMenuItems = [
    { icon: "logout", id: "/logout", label: "Đăng xuất" },
  ];
  useEffect(() => {
    setActiveItem(path);
  }, [path]);

  const isGroupActive = (groupId: string) => {
    const group = menuItems.find((item) => item.groupId === groupId);
    if (!group || !group.children) return false;
    return group.children.some((child) => path.startsWith(child.id));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

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
    } catch (error) {
      handleErrorApi({ error });
    }finally{
      setLoading(false);
    }
  };
  return (
    <div
      className={`${styles.sidebar}  bg-background  ${isSidebarCollapsed ? styles.collapsed : ""}`}
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
              priority
              height={300}
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
            <div className={`${styles.logoText} cu no-pointer`}>Đắp Việt</div>
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
              <React.Fragment key={index}>
                {item.children ? (
                  <div>
                    <div
                      className={`${styles.groupItem} ${
                        isGroupActive(item.groupId) ? `${styles.activeGroup } text-foreground` : ""
                      } ${expandedGroups[item.groupId] && styles.expandedGroup}`}
                      onClick={() => toggleGroup(item.groupId)}
                    >
                      <MenuItem
                        icon={item.icon}
                        id={item.id || ""}
                        label={item.label}
                        activeItem={activeItem}
                        isSidebarCollapsed={isSidebarCollapsed}
                      />
                      {expandedGroups[item.groupId] ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </div>
                    {expandedGroups[item.groupId] && (
                      <div className={`${styles.subMenu} text-foreground`}>
                        <div className={`${styles.borderSubMenu} `}>
                          {item.children.map((subItem) => (
                            <Link prefetch href={subItem.id} key={subItem.id}>
                              <MenuItem
                                {...subItem}
                                activeItem={activeItem}
                                isSidebarCollapsed={isSidebarCollapsed}
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link prefetch href={item.id} key={item.id}>
                    <MenuItem
                      {...item}
                      activeItem={activeItem}
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                  </Link>
                )}
              </React.Fragment>
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
}
