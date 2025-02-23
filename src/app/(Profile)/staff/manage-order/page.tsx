import OrderTable from "./order-table";
import styles from "../manage-product/Product.module.css";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl text-foreground font-bold">Quản lý đơn hàng</h1>
        </div>
       {/* <ButtonAdd /> */}
      </div>
      <OrderTable />
    </div>
  );
};

export default IndexPage;
