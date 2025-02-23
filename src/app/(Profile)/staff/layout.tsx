import  SidebarStaff  from './sidebar';
import styles from '../customer/UserProfile.module.css'; // Import styles cho Layout
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý website",
};

export default async function LayoutCustomer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={styles.profileContainer}>
          <SidebarStaff />
          <main className={`${styles.mainContent}  !bg-primary-foreground`}>
            <div className={`${styles.contentWrapper} bg-background`}>
            {children}
            </div>
          </main>
        </div>
      );
}
