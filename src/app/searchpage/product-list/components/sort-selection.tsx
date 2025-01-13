// "use client";
// import React, { useState } from "react";
// import styles from "../ProductList.module.css";

// const SortSelect: React.FC = () => {
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//   const updateSort = (value: "asc" | "desc") => {
//     setSortOrder(value);
//   };

//   return (
//     <div className="flex justify-end">
//       <h3 style={{whiteSpace: 'nowrap', marginRight: '10px', color: "black"}}>Sắp Xếp:</h3>
//       <select
//         className={styles.sortSelect}
//         value={sortOrder}
//         onChange={(e) => updateSort(e.target.value as "asc" | "desc")}
//         aria-label="Sort products"
//       >
//         <option value="asc">Thấp -&gt; Cao</option>
//         <option value="desc">Cao -&gt; Thấp</option>
//       </select>
//     </div>
//   );
// };

// export default SortSelect;
