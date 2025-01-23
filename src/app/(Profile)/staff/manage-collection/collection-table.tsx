'use client'
import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import typesApiRequest from "@/apiRequests/type";
import { collectionListResType } from "@/schemaValidations/type.schema";
import ButtonDelete from "./button-delete";
import Image from "next/image";
import { truncateText } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/app-provider";

export default function CollectionTable() {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("accessToken");
  const [data, setData] = useState<collectionListResType>();
  const {isRefresh} = useAppContext()
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await typesApiRequest.collectionsList();
        setData(result.payload);
      } catch (error) {
        console.log("Lỗi lấy bộ sưu tập: ", error);
      }
    };

    fetchData(); // Gọi hàm lấy dữ liệu
  }, [deleted,isRefresh]);
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="scroll max-h-[600px] text-foreground">
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHead}>Mã sưu tập</th>
            <th className={styles.tableHead}>Hình ảnh</th>
            <th className={styles.tableHead}>Tên bộ sưu tập</th>
            <th className={styles.tableHead}>Mô tả</th>
            <th className={styles.tableHead}>Trạng thái</th>
            <th className={`${styles.tableHead} ${styles.textCenter}`}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((collection) => (
            <tr key={collection.id} className={styles.tableRow}>
              {/* Mã danh mục */}
              <td className={`${styles.tableCell} font-medium`}>
                {collection.id.length > 10
                  ? `${collection.id.slice(0, 9)}…`
                  : collection.id}
              </td>

              {/* Hình ảnh */}
              <td className={styles.tableCell}>
                <div className="flex items-center space-x-2">
                  {collection.images.map((img, index) => (
                    <Image
                      key={index}
                      width={100}
                      height={100}
                      loading="lazy"
                      src={img}
                      alt={collection.name}
                      className="w-16 h-16 object-cover border rounded"
                    />
                  ))}
                </div>
              </td>

              {/* Tên danh mục */}
              <td className={styles.tableCell}>{collection.name}</td>

              {/* Mô tả */}
              <td className={styles.tableCell}>
                {truncateText(collection.description, 10)}
              </td>

              {/* Trạng thái */}
              <td className={styles.tableCell}>
                {collection.deleted ? (
                  <span className="text-red-500 font-bold">Đã xóa</span>
                ) : (
                  <span className="text-green-500 font-bold">Hoạt động</span>
                )}
              </td>

              {/* Thao tác */}
              <td className={`${styles.tableCell} ${styles.textCenter}`}>
                <ButtonDelete
                  collectionId={collection.id}
                  isDelete={collection.deleted}
                  deleted={deleted}
                  setDeleted={setDeleted}
                />
                {!collection.deleted && (
                  <Link
                    href={`/staff/manage-collection/${collection.id}`}
                    className={styles.top}
                  >
                    Chỉnh sửa
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
