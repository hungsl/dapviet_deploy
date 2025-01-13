import React from 'react';
import styles from './BarChart.module.css';
import { YAxisLabel } from './_component/label';
import { Bar } from './_component/bar';
import { LegendItem } from './_component/legend-item';

const barData = [
  { height: 77, color: '#62B2FD' },
  { height: 100, color: '#9BDFC4' },
  { height: 72, color: '#F99BAB' },
  { height: 56, color: '#FFB44F' },
  // { height: 39, color: '#9F97F7' }
];

const legendData = [
  { icon: 'dotPending', label: 'Đang chờ xử lý', alt: 'Pending icon' },
  { icon: 'dotProcessed', label: 'Đã xử lý', alt: 'Processed icon' },
  { icon: 'dotShipping', label: 'Đang giao hàng', alt: 'Shipping icon' },
  { icon: 'dotComplete', label: 'Đã hoàn thành', alt: 'Completed icon' }
];

const yAxisValues = [
  { value: 80, marginTop: 0 },
  { value: 50, marginTop: 14 },
  { value: 30, marginTop: 7 },
  { value: 25, marginTop: 4 }
];

export const BarChartMiddle: React.FC = () => {
  return (
    <div className={styles.charts}>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>Số lượng đơn hàng theo trạng thái</div>
          </div>
          <div className={styles.chartContent}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39c826f54cb22b97f951fe03d767dfdf151c5a57dbd6dd7677971b0a44187bbf?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393"
              className={styles.gridLine}
              alt=""
            />
            <div className={styles.barContainer}>
              <div className={styles.yAxis}>
                <div className={styles.yAxisLabel}>
                  {yAxisValues.map((item, index) => (
                    <YAxisLabel
                      key={index}
                      value={item.value}
                      marginTop={item.marginTop}
                    />
                  ))}
                </div>
                <div className={styles.yAxisTitle}>Số lượng</div>
              </div>
              <div className={styles.barGroup}>
                {barData.map((bar, index) => (
                  <Bar key={index} height={bar.height} color={bar.color} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.legendContainer}>
            {legendData.map((item, index) => (
              <LegendItem
                key={index}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};