import React from 'react';
import styles from './Q&A.module.css';
import { ContactInfo as ContactInfoType } from '../types';
import Image from 'next/image';

interface ContactInfoProps {
  info: ContactInfoType;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ info }) => {
  return (
    <div className={styles.contactItem}>
      <Image width={500} height={500} loading="lazy" src={info.icon} alt={info.alt} className={styles.contactIcon} />
      <div className={styles.contactText}>{info.text}</div>
    </div>
  );
};