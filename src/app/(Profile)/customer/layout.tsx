import styles from './UserProfile.module.css'; // Import styles cho Layout
import ButtonBack from './button-back';
import { Sidebar } from './sidebar/sidebar';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông Tin cá nhân",
};
export default async function LayoutCustomer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={styles.profileContainer}>
          <Sidebar />
          <main className={`${styles.mainContent} !bg-primary-foreground `}>
            <div className={`${styles.contentWrapper} bg-background `}>
              <ButtonBack />
            {children}
            </div>
          </main>
        </div>
      );
}
