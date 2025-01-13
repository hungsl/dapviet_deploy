import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import { cookies } from "next/headers";
import typesApiRequest from "@/apiRequests/type";
import { collectionListResType } from "@/schemaValidations/type.schema";
import { redirect } from "next/navigation";
import ButtonDelete from "./button-delete";
import Image from "next/image";
import { truncateText } from "@/lib/utils";

export default async function CollectionTable() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  let data: collectionListResType | null = null;
  try {
    const result = await typesApiRequest.collectionsList(
      accessToken?.value || ""
    );
    data = result.payload;
  } catch (error) {
    console.log("lỗi lấy bộ sưu tập: ", error)
    redirect("/homepage");
  }

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
                  accessToken={accessToken?.value || ""}
                  isDelete={collection.deleted}
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
