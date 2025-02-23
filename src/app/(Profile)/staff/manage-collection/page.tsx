import styles from "../manage-product/Product.module.css";
import ButtonAddCollection from "./ButtonCreate";
import CollectionTable from "./collection-table";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl text-foreground font-bold">Quản lý danh mục sản phẩm</h1>
        </div>
       <ButtonAddCollection />
      </div>
      <CollectionTable />
    </div>
  );
};

export default IndexPage;
