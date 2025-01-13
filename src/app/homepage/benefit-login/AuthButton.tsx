import React from 'react';
import styles from './Auth.module.css';
import { AuthButtonProps } from './types';




export const AuthButton: React.FC<AuthButtonProps> = ({ icon, children, onAction }) => (
  <button className={styles.authButton} onClick={onAction}>
    {icon && <img loading="lazy" src={icon} alt="" className={styles.authIcon} />}
    {children}
  </button>
);