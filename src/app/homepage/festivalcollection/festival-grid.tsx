import React from "react";
import { data } from "./types";
import styles from "./FestivalCards.module.css";
import Link from "next/link";
import Image from "next/image";

export function FestivalGrid({ item }: { item: data }) {
  return (
    <>
        <Image
          width={500}
          height={500}
          src={item.images}
          alt={item.name}
          loading="lazy"
          quality={100}
          className={`${styles.cardImage} ${styles.wideImage}`}
        />
        <div className="text-center mt-4">
          <h3 className={`text-lg font-semibold ${styles.title}`}>
            {item.name}
          </h3>
          <Link href={`/collection/${item.id}`} className={styles.actionButton}>
            Xem Thêm
          </Link>
      </div>
    </>
  );
}
