import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import ButtonDelete from "./button-delete";
import { cookies } from "next/headers";
import typesApiRequest from "@/apiRequests/type";
import { TypesListResType } from "@/schemaValidations/type.schema";
import { redirect } from "next/navigation";

export default async function SizeTable() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  let data: TypesListResType | null = null;
  try {
    const result = await typesApiRequest.sizesList(accessToken?.value || "");
    data = result.payload;
    console.log(data)
  } catch (error) {
    console.log("lỗi lấy danh sách: ", error)
    redirect("/homepage");
  }
  return (
    <div className="scroll max-h-[600px] text-foreground">
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHead}>Mã số đo</th>
            <th className={styles.tableHead}>Số đo</th>
            <th className={styles.tableHead}>Trạng thái</th>
            <th className={`${styles.tableHead} ${styles.textCenter}`}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((size) => (
            <tr key={size.id} className={styles.tableRow}>
              <td className={`${styles.tableCell} font-medium`}>
                {size.id.length > 10 ? `${size.id.slice(0, 9)}…` : size.id}
              </td>
              <td className={styles.tableCell}>{size.name}</td>
              <td className={styles.tableCell}>
                {size.deleted ? (
                  <span className="text-red-500 font-bold">Đã xóa</span>
                ) : (
                  <span className="text-green-500 font-bold">Hoạt động</span>
                )}
              </td>
              <td className={`${styles.tableCell} ${styles.textCenter}`}>
                <ButtonDelete
                  sizeId={size.id}
                  accessToken={accessToken?.value || ""}
                  isDelete={size.deleted}
                />
                {!size.deleted &&
                <Link
                  href={`/staff/manage-size/${size.id}`}
                  className={styles.top}
                >
                  Chỉnh sửa
                </Link>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
