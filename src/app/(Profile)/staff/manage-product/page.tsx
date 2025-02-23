import ButtonAdd from "./ButtonAdd";
import ProductTable from "./product-table";
import styles from "./Product.module.css";

export default function  IndexPage () {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl text-foreground font-bold">Quản lý sản phẩm</h1>
        </div>
       <ButtonAdd />
      </div>
      <ProductTable />
    </div>
  );
};

