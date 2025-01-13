import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const FooterRight: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.copyrightWrapper}>
        <Image
          width ={200}
          height ={200}
          loading="lazy"
          src="/homepage/footer/copyRight.png"
          className={styles.copyrightIcon}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.copyrightText}>
          2024 DAPViet. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default FooterRight;