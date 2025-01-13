import React from "react";
import styles from "./FestivalGrid.module.css";
import { FestivalGridProps } from "./types";
import { FestivalCard } from "./special-card";

export const FestivalGrid: React.FC<FestivalGridProps> = ({ items }) => {
  const itemsPerColumn = Math.ceil(items.length / 3);

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {[0, 1, 2].map((columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            <div className={styles.cardContainer}>
              {items
                .slice(
                  columnIndex * itemsPerColumn,
                  (columnIndex + 1) * itemsPerColumn
                )
                .slice(0, 4)
                .map((item, index) => (
                  <FestivalCard
                    key={index}
                    imageSrc={item.imageSrc}
                    iconSrc={item.iconSrc}
                    title={item.title}
                    description={item.description}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
