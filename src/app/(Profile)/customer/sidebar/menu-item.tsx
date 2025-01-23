import React from "react";
import styles from "../UserProfile.module.css";
import { MenuItemProps } from "./types";
import {
  Home,
  Package,
  Tag,
  Sliders,
  Layers,
  ShoppingCart,
  BarChart,
  Users,
  CreditCard,
  User,
  History,
  ClipboardList,
  Wallet,
  LogOut
} from "lucide-react"; // Import các icon từ Lucide

// Tạo map giữa ID và các icon tương ứng
const iconMap: Record<string, React.ReactNode> = {
  dashboard: <Home className={`${styles.menuIcon}`} />,
  "manage-product": <Package className={`${styles.menuIcon}`} />,
  "manage-category": <Tag className={`${styles.menuIcon}`} />,
  "manage-size": <Sliders className={`${styles.menuIcon}`} />,
  "manage-collection": <Layers className={`${styles.menuIcon}`} />,
  "manage-order": <ShoppingCart className={`${styles.menuIcon}`} />,
  "manage-revenue": <BarChart className={`${styles.menuIcon}`} />,
  "manage-user": <Users className={`${styles.menuIcon}`} />,
  "manage-payment": <CreditCard className={`${styles.menuIcon}`} />,
  profile: <User className={`${styles.menuIcon}`} />, 
  history: <History className={`${styles.menuIcon}`} />, 
  order: <ClipboardList className={`${styles.menuIcon}`} />,
  payment: <Wallet className={`${styles.menuIcon}`} />, 
  logout: <LogOut className={`${styles.menuIcon} text-red-600`} />,
};

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  id,
  label,
  activeItem,
  isSidebarCollapsed,
  onClick,
}) => {
  const renderIcon = iconMap[icon] || null; // Lấy icon dựa trên ID, nếu không có thì là null

  return (
    <div
      className={`${styles.menuItem} ${activeItem === id ? styles.active : ""}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {renderIcon}
      <div
        className={`${styles.menuLabel} ${
          isSidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
};
