// "use client";
// import React, { useEffect, useState } from "react";
// import styles from "./Dashboard.module.css";
// import { StatCard } from "./stat-card";
// import Revenue from "./revenue/revenue";
// import dashboardApiRequest from "@/apiRequests/dashboard";
// import { dataDashboard } from "../types";
// import CustomerStats from "./pie-chart/customer-stats";
// import BarChartMiddle from "./bar-chart/bar-chart";

// const revenueData = {
//   amount: "7.852.000 VND", // Doanh thu
//   percentageChange: 2.1, // Tỷ lệ thay đổi so với tuần trước
//   promotionPeriod: "Khuyến mãi từ 01/12 đến 31/12", // Thời gian khuyến mãi
//   chartData: [
//     { currentValue: 120, previousValue: 100 },
//     { currentValue: 140, previousValue: 130 },
//     { currentValue: 160, previousValue: 150 },
//     { currentValue: 180, previousValue: 170 },
//     { currentValue: 200, previousValue: 190 },
//     { currentValue: 220, previousValue: 210 },
//     { currentValue: 240, previousValue: 230 },
//     { currentValue: 260, previousValue: 250 },
//     { currentValue: 280, previousValue: 270 },
//     { currentValue: 300, previousValue: 290 },
//     { currentValue: 320, previousValue: 310 },
//     { currentValue: 340, previousValue: 330 },
//   ], // Dữ liệu cho biểu đồ
// };

// export default function Dashboard() {
//   const [data, setData] = useState<dataDashboard>();
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const result = await dashboardApiRequest.getDashboard();
//       setData(result.payload.data);
//     };
//     fetchDashboard();
//   }, []);
//   function calculatePercentageChange(
//     currentValue: number,
//     previousValue: number
//   ) {
//     if (previousValue === 0) {
//       return currentValue > 0 ? 100 : 0; // Trường hợp tuần trước không có dữ liệu
//     }
//     return ((currentValue - previousValue) / previousValue) * 100;
//   }
//   if (!data)
//     return (
//       <div className="flex justify-center items-center h-screen flex-col relative">
//         <div className="absolute">Loading</div>
//         <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
//       </div>
//     );

//   return (
//     <div>
//       <div className={styles.statsContainer}>
//         <StatCard
//           title="Đơn hàng bị hủy"
//           value={data.totalCanceledOrders}
//           className={styles.red}
//         />
//         <StatCard
//           title="Đơn hàng hoàn thành"
//           value={data.totalDeliveredOrders}
//           className={styles.blue}
//         />
//         <StatCard
//           title="Sản phẩm bán ra"
//           value={data.totalSell}
//           className={styles.purples}
//         />
//       </div>

//       <div className={styles.chartsContainer}>
//         <div className={styles.barChartSection}>
//           <BarChartMiddle data = {data}/>
//         </div>

//         <div className={styles.pieChartSection}>
//           <CustomerStats
//             totalNewUsers={data.totalNewUsers}
//             totalOldUsers={data.totalOldUsers}
//           />
//         </div>
//       </div>

//       <div className={styles.revenueSection}>
//         <Revenue
//           amount={data.totalRevenueThisWeek || 0}
//           percentageChange={calculatePercentageChange(
//             data.totalRevenueThisWeek,
//             data.totalRevenueLastWeek
//           )}
//           chartData={revenueData.chartData}
//         />
//       </div>
//     </div>
//   );
// }
