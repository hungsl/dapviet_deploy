import React from 'react';
import styles from '../UserProfile.module.css';
import { MenuItemProps } from './types';
import Image from 'next/image';


export const MenuItem: React.FC<MenuItemProps> = ({ icon, id, label, activeItem, isSidebarCollapsed , onClick}) => {
  
  return (
    <div 
      className={`${styles.menuItem} ${activeItem === id ? styles.active : ""}`} 
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <Image
        width={300}
        height={300}
        loading="lazy"
        src={icon}
        className={`${styles.menuIcon}`}
        alt=""
      />
      <div className={`${styles.menuLabel} ${isSidebarCollapsed ? styles.collapsed : ''}`}>{label}</div>
    </div>
  );
};