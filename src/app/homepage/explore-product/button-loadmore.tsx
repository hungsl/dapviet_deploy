import React from 'react'
import styles from "./ProductGrid.module.css";
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";

export default function ButtonLoadMore() {
  return (
    <Link prefetch href='/searchpage' className={styles.loadMore}>
        <span className={styles.loadMoreText}>Xem Thêm</span>
        <FaArrowRightLong />
      </Link>
  )
}
