import UserTable from "./user-table";
import styles from "../manage-product/Product.module.css";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        </div>
       {/* <ButtonAdd /> */}
      </div>
      <UserTable />
    </div>
  );
};

export default IndexPage;
