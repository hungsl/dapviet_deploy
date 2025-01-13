"use client"; // CountdownTimer.tsx
import React, { useState, useEffect } from "react";
import styles from "./CountdownTimer.module.css";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ ngày: 0, giờ: 0, phút: 0, giây: 0 });
  const [mounted, setMounted] = useState(false);

  // This effect will only run once when the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();

    // Set the end time to 2 days from now
    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 2, // Chỉnh số ngày ở đây
      0,
      0,
      0
    ).getTime();
    const distance = endTime - now.getTime();

    const days = Math.floor(distance / (24 * 60 * 60 * 1000));
    const hoursLeft = Math.floor((distance % (24 * 60 * 60 * 1000)) / (3600 * 1000));
    const minutesLeft = Math.floor((distance % (3600 * 1000)) / (60 * 1000));
    const secondsLeft = Math.floor((distance % (60 * 1000)) / 1000);

    return { ngày: days, giờ: hoursLeft, phút: minutesLeft, giây: secondsLeft };
  };

  // Only calculate time left on the client side (after mount)
  useEffect(() => {
    if (mounted) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mounted]);

  if (!mounted) {
    return null; // Prevent rendering before client-side mounting
  }

  return (
    <div className={styles.container}>
      <div className={styles.timerWrapper}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className={styles.timerUnit}>
            <div className={styles.numberCountdown}>{value}</div>
            <span className={styles.unitLabel}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
