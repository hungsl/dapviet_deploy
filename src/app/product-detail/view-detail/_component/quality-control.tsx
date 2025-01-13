// 'use client'
// import React, { useState } from 'react';
// import styles from '../ProductDetail.module.css';

// export default function QuantityControl() {
//   const [quantity, setQuantity] = useState(1);
  
//   return (
//     <div className={styles.quantityControl}>
//       <button 
//         className={styles.quantityButton} 
//         onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//         aria-label="Decrease quantity"
//       >
//         -
//       </button>
//       <span className={styles.quantityValue}>{quantity}</span>
//       <button 
//         className={styles.quantityButton} 
//         onClick={() => setQuantity((prev) => prev + 1)}
//         aria-label="Increase quantity"
//       >
//         +
//       </button>
//     </div>
//   );
// };