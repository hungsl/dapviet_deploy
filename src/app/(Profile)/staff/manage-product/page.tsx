import ButtonAdd from "./ButtonAdd";
import ProductTable from "./product-table";
import styles from "./Product.module.css";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        </div>
       <ButtonAdd />
      </div>
      <ProductTable />
    </div>
  );
};

export default IndexPage;
