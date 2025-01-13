// "use client";
// import { useState } from "react";
// import { datalist } from "./types";
// import { Button } from "@/components/ui/button";
// import { FestivalGrid } from "./festival-grid";
// import styles from "./Carousel.module.css";

// export default function Carousel({ cards }: datalist) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 3;

//   const handleNext = () => {
//     if (currentIndex < cards.length - itemsPerPage) {
//       setCurrentIndex(currentIndex + itemsPerPage);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - itemsPerPage);
//     }
//   };

//   const visibleCards = cards.slice(currentIndex, currentIndex + itemsPerPage);

//   return (
//     <div className={styles.container}>
//       <div className={styles.gridWrapper}>
//         <FestivalGrid cards={visibleCards} />
//       </div>

//       {/* Nút Prev */}
//       <Button
//         variant="outline"
//         className={`${styles.button} ${styles.prevButton} ${
//           currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={handlePrev}
//         disabled={currentIndex === 0}
//       >
//         Trước
//       </Button>

//       {/* Nút Next */}
//       <Button
//         variant="outline"
//         className={`${styles.button} ${styles.nextButton} ${
//           currentIndex + itemsPerPage >= cards.length
//             ? "opacity-50 cursor-not-allowed"
//             : ""
//         }`}
//         onClick={handleNext}
//         disabled={currentIndex + itemsPerPage >= cards.length}
//       >
//         Tiếp
//       </Button>
//     </div>
//   );
// }
