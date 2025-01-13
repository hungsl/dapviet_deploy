import React from "react";
import styles from "./Dashboard.module.css";
import { StatCard } from "./stat-card";
import { BarChartMiddle } from "./bar-chart/bar-chart";
import { CustomerStats } from "./pie-chart/customer-stats";
import Revenue from "./revenue/revenue";

export default function Dashboard() {
  const revenueData = {
    amount: "7.852.000 VND", // Doanh thu
    percentageChange: 2.1, // Tỷ lệ thay đổi so với tuần trước
    promotionPeriod: "Khuyến mãi từ 01/12 đến 31/12", // Thời gian khuyến mãi
    chartData: [
      { currentValue: 120, previousValue: 100 },
      { currentValue: 140, previousValue: 130 },
      { currentValue: 160, previousValue: 150 },
      { currentValue: 180, previousValue: 170 },
      { currentValue: 200, previousValue: 190 },
      { currentValue: 220, previousValue: 210 },
      { currentValue: 240, previousValue: 230 },
      { currentValue: 260, previousValue: 250 },
      { currentValue: 280, previousValue: 270 },
      { currentValue: 300, previousValue: 290 },
      { currentValue: 320, previousValue: 310 },
      { currentValue: 340, previousValue: 330 },
    ], // Dữ liệu cho biểu đồ
  };

  return (
    <div className={`${styles.dashboard} scroll`}>
      <div className={styles.statsContainer}>
        <StatCard title="Khách hàng mới" value={15} className={styles.red} />
        <StatCard
          title="Đơn hàng hoàn thành"
          value={35}
          className={styles.blue}
        />
        <StatCard
          title="Sản phẩm bán ra"
          value={68}
          className={styles.purples}
        />
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.barChartSection}>
          <BarChartMiddle />
        </div>

        <div className={styles.pieChartSection}>
          <CustomerStats />
        </div>
      </div>

      <div className={styles.revenueSection}>
        <Revenue
          amount={revenueData.amount}
          percentageChange={revenueData.percentageChange}
          promotionPeriod={revenueData.promotionPeriod}
          chartData={revenueData.chartData}
        />
      </div>
    </div>
  );
}
