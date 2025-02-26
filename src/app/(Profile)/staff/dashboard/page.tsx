import React from "react";
// import styles from "./Dashboard.module.css";
// import Dashboard from "./dashboard";

// export default function page() {
//   return (
//     <div className={`${styles.dashboard} scroll`}>
//       <Dashboard />
//     </div>
//   );
// }
import { Dashboard } from "./components/dashboard";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center p-6">
      <div className="w-full max-w-7xl">
        <Dashboard />
      </div>
    </div>
  );
}
