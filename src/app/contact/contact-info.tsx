import React from 'react';
import styles from './Contact.module.css';
import { ContactInfoProps } from './types';
import Image from 'next/image';

export const ContactInfo: React.FC<ContactInfoProps> = ({ icon, text }) => (
  <div className={styles.contactInfoItem}>
    <Image width={200} height={200} priority src={icon} alt="icon" className={styles.contactIcon} />
    <div className={styles.contactText}>{text}</div>
  </div>
);