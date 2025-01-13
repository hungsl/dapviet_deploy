import styles from "../manage-product/Product.module.css";
import ButtonAddCategory from "./ButtonCate";
import CategoryTable from "./type-table";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl font-bold">Quản lý danh mục sản phẩm</h1>
        </div>
       <ButtonAddCategory />
      </div>
      <CategoryTable />
    </div>
  );
};

export default IndexPage;
