'use client'
import { usePopup } from '@/app/context/popup-provider';
import React from 'react'
import styles from './Checkout.module.css';

export default function ButtonBackToCart() {
    const { setContent } = usePopup();

  const goToCheckout = () => {
    setContent('cart');
  };
  return (
    <button onClick={goToCheckout} type="button" className={styles.backButton}>Quay lại</button>
  )
}
