import styles from "../manage-product/Product.module.css";
import ButtonAddSize from "./ButtonSize";
import SizeTable from "./size-table";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center my-4 mt-12">
          <h1 className="text-2xl font-bold text-foreground">Quản lý số đo</h1>
        </div>
       <ButtonAddSize />
      </div>
      <SizeTable />
    </div>
  );
};

export default IndexPage;
