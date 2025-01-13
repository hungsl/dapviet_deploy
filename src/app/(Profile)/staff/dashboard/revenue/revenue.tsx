import React from "react";
import styles from "./Revenue.module.css";
import { RevenueProps } from "../../types";
import { BarChart } from "./bar-chart";

const Revenue: React.FC<RevenueProps> = ({
  amount,
  percentageChange,
  promotionPeriod,
  chartData,
}) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  return (
    <div className={styles.revenueContainer}>
      <div className={styles.revenueCard}>
        <h2 className={styles.revenueTitle}>Doanh thu</h2>
        <div className={styles.revenueAmount}>{amount}</div>
        <div className={styles.percentageChange}>
          {percentageChange < 0 ? (
            <span className={styles.arrowIconDown}>↓</span>
          ) : (
            <span className={styles.arrowIcon}>↑</span>
          )}
          <div className={styles.changeText}>
            <span
              className={
                percentageChange < 0
                  ? `${styles.RedValue}`
                  : `${styles.changeValue}`
              }
            >
              {percentageChange}%
            </span>
            <span className={styles.changePeriod}> vs last week</span>
          </div>
        </div>
        <p className={styles.promotionPeriod}>{promotionPeriod}</p>

        <div className={styles.chartContainer}>
          {chartData.map((data, index) => (
            <BarChart key={index} data={data} />
          ))}
        </div>

        <div className={styles.monthLabels}>
          {months.map((month) => (
            <div key={month} className={styles.monthLabel}>
              {month}
            </div>
          ))}
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendDotCurrent} />
            <span>Năm nay</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDotPrevious} />
            <span>Năm trước</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
