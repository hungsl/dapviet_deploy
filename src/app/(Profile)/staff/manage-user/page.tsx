import UserTable from "./user-table";
import styles from "../manage-product/Product.module.css";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl text-foreground font-bold">Quản lý người dùng</h1>
        </div>
        <Link href="/staff/manage-user/create-user" className={styles.createBtn}>
          Thêm người dùng
        </Link>
      </div>
      <UserTable />
    </div>
  );
};

export default IndexPage;
