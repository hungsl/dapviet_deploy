import React from 'react';
import { ButtonProps } from './type';
import styles from "./OrderConfimation.module.css"

export const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};