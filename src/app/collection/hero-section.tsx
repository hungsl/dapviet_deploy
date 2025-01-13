import Image from "next/image";
import React from "react";
import styles from "./CollectionPage.module.css";
interface collection {
  name: string;
  images: (string | null)[];
  description: string | null;
}
export default function HeroSection({
  collection,
}: {
  collection: collection;
}) {
  return (
    <div className={styles.heroSection}>
      <Image
        width={500}
        height={500}
        quality={100}
        src={collection.images[0] || ""}
        // src="https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/078074bc-b755-4bf6-a0cf-38324478e2f7.jpeg"
        alt="Hero 1"
        className={styles.heroImage}
      />
      <Image
        width={500}
        height={500}
        quality={100}
        src={collection.images[1] || ""}
        // src="https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/1ead3948-bbc2-4167-9e96-d02144849158.jpeg"
        alt="Hero 2"
        className={styles.heroImage}
      />
      <Image
        width={500}
        height={500}
        quality={100}
        src={collection.images[2] || ""}
        // src="https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/ed518589-2885-400e-a0fc-53e83d6ec648.png"
        alt="Hero 3"
        className={styles.heroImage}
      />
      <div className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>{collection.name}</h1>
        <div className={styles.bgDescript}>
        <p className={styles.heroDescription}>
        {collection.description}
        </p>
        </div>
      </div>
    </div>
  );
}
