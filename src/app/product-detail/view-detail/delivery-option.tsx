import React from 'react';
import styles from './ProductDetail.module.css';
import { DeliveryOptionProps } from './types';
import Image from 'next/image';

export const DeliveryOption: React.FC<DeliveryOptionProps> = ({ icon, text }) => {
  return (
    <div className={styles.deliveryOption}>
      <div className={styles.deliveryContent}>
        <Image width={100} height={100}  priority src={icon} alt="nha" className={styles.deliveryIcon} />
        <span className={styles.deliveryText}>{text}</span>
      </div>
    </div>
  );
};