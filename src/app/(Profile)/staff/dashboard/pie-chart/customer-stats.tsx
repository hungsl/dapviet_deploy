// "use client";
// import * as React from "react";
// import styles from "./Stat.module.css";
// import { Pie } from "react-chartjs-2"; // Import Pie chart từ react-chartjs-2
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import các phần của Chart.js

// // Đăng ký các phần của Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend);



// export default function CustomerStats({
//   totalNewUsers,
//   totalOldUsers,
// }: {
//   totalNewUsers: number;
//   totalOldUsers: number;
// }) {
  
//   const totalUsers = totalNewUsers + totalOldUsers;
//   const newUsersPercentage = totalUsers === 0 ? 0 : (totalNewUsers / totalUsers) * 100;
//   const oldUsersPercentage = totalUsers === 0 ? 0 : (totalOldUsers / totalUsers) * 100;
//   const customerData = [
//     {
//       percentage: oldUsersPercentage.toFixed(2), 
//       label: "Khách hàng cũ",
//       color: "rgb(90, 106, 207)", 
//     },
//     {
//       percentage: newUsersPercentage.toFixed(2), 
//       label: "Khách hàng mới",
//       color: "rgb(199, 206, 255)",
//     },
//   ];
//   const data = {
//     labels: customerData.map((stat) => stat.label), // Danh sách nhãn
//     datasets: [
//       {
//         data: customerData.map((stat) => parseInt(stat.percentage)), // Dữ liệu tỉ lệ phần trăm
//         backgroundColor: customerData.map((stat) => stat.color), // Màu nền của các phần trong pie chart
//         hoverOffset: 4,
//       },
//     ],
//   };
//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <div className={styles.content}>
//           <div className={styles.title}>Tỷ lệ khách hàng mới</div>
//           <div className={styles.dateRange}>từ 10-16 Jan, 2025</div>
//           <div className={styles.pieimg}>
//             <div className={styles.chart}>
//               <Pie data={data} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
