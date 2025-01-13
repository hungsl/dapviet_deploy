import React from "react";
import styles from "./Dashboard.module.css";
import Dashboard from "./dashboard";


export default function page() {
  return (
    <div className={`${styles.dashboard} scroll`}>
      <Dashboard />
    </div>
  );
}
