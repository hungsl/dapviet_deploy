import React from 'react';
import styles from './Contact.module.css';
import { ContactInfoProps } from './types';

export const ContactInfo: React.FC<ContactInfoProps> = ({ icon, text }) => (
  <div className={styles.contactInfoItem}>
    <img loading="lazy" src={icon} alt="" className={styles.contactIcon} />
    <div className={styles.contactText}>{text}</div>
  </div>
);