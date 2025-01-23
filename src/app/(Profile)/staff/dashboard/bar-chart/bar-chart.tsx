// import React from 'react';
// import styles from './BarChart.module.css';
// import { Bar } from './_component/bar';
// import { LegendItem } from './_component/legend-item';
// import { dataDashboard } from '../../types';

// const legendData = [
//   { icon: 'dotPending', label: 'Đang chờ xử lý', alt: 'Pending icon' },
//   { icon: 'dotProcessed', label: 'Đã xử lý', alt: 'Processed icon' },
//   { icon: 'dotShipping', label: 'Đang giao hàng', alt: 'Shipping icon' },
//   { icon: 'dotComplete', label: 'Đã hoàn thành', alt: 'Completed icon' }
// ];

// // const yAxisValues = [
// //   { value: 80, marginTop: 80 },
// //   { value: 50, marginTop: 50 },
// //   { value: 30, marginTop: 30 },
// //   { value: 25, marginTop: 25 }
// // ];

// // const barData = [
// //   { height: 77, color: '#62B2FD' },
// //   { height: 100, color: '#9BDFC4' },
// //   { height: 72, color: '#F99BAB' },
// //   { height: 56, color: '#FFB44F' },
// //   // { height: 39, color: '#9F97F7' }
// // ];

// export default function BarChartMiddle({data}: {data: dataDashboard}) {
//   const barData = [
//     { height: data.totalPendingOrders , color: '#62B2FD' },  // Đang chờ xử lý
//     { height: data.totalDeliveredOrders , color: '#9BDFC4' }, // Đã xử lý
//     { height: data.totalInTransitOrders , color: '#F99BAB' }, // Đang giao hàng
//     { height: data.totalDeliveredOrders , color: '#FFB44F' }  // Đã hoàn thành
//   ];
  
//   return (
//     <div className={styles.charts}>
//       <div className={styles.chartContainer}>
//         <div className={styles.chartWrapper}>
//           <div className={styles.chartHeader}>
//             <div className={styles.chartTitle}>Số lượng đơn hàng theo trạng thái</div>
//           </div>
//           <div className={styles.chartContent}>
//             <div className={styles.barContainer}>
//               <div className={styles.yAxis}>
//                 <div className={styles.yAxisLabel}>
//                 <div className={styles.yAxisTitle}>Số lượng</div>
//                 </div>
//               </div>
//               <div className={styles.barGroup}>
//                 {barData.map((bar, index) => (
//                   <Bar key={index} height={bar.height} color={bar.color} label={bar.height} />
//                 ))}

//               </div>
//             </div>
//           </div>
//           <div className={styles.legendContainer}>
//             {legendData.map((item, index) => (
//               <LegendItem
//                 key={index}
//                 icon={item.icon}
//                 label={item.label}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };