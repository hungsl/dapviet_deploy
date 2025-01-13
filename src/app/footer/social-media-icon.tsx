'use client'
import React from 'react';
import styles from './Footer.module.css';
import { SocialMediaProps } from './types';

const handleMoveMedia = () =>{
  console.log('move')
}

export const SocialMediaIcon: React.FC<SocialMediaProps> = ({ src, alt }) => (
  <div className={styles.socialIconWrapper} onClick={handleMoveMedia}>
    <img loading="lazy" src={src} className={styles.socialIcon} alt={alt} />
  </div>
);