import React from 'react';
import styles from './Footer.module.css';
import { FooterSectionProps } from './types';
import Link from 'next/link';

export const FooterSection: React.FC<FooterSectionProps> = ({ title, links}) => (
  <div className={styles.footerSection}>
    <div className={styles.sectionTitle}>{title}</div>
    <div className={styles.linkContainer}>
      {links.map((link, index) => (
        <Link key={index} href={link.address} className={`${styles.footerLink} ${link.className || ''}`}>
          {link.text}
        </Link>
      ))}
    </div>
  </div>
);