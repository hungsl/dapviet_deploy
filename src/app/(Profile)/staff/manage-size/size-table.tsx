"use client";
import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import ButtonDelete from "./button-delete";
import typesApiRequest from "@/apiRequests/type";
import { TypesListResType } from "@/schemaValidations/type.schema";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/app-provider";

export default function SizeTable() {
  const [data, setData] = useState<TypesListResType | null>();
  const { isRefresh } = useAppContext();
  // let data: TypesListResType | null = null;
  // try {
  //   const result = await typesApiRequest.sizesList(accessToken?.value || "");
  //   data = result.payload;
  //   console.log(data)
  // } catch (error) {
  //   console.log("lỗi lấy danh sách: ", error)
  //   redirect("/homepage");
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await typesApiRequest.sizesList();
        setData(result.payload);
        // console.log(result.payload);
      } catch (error) {
        console.log("Lỗi lấy danh sách: ", error);
      }
    };
    fetchData(); // Gọi hàm lấy dữ liệu
  }, [isRefresh]);
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
          <tr className={`${styles.tableRow} text-black`}>
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
                <ButtonDelete sizeId={size.id} isDelete={size.deleted} />
                {!size.deleted && (
                  <Link
                    href={`/staff/manage-size/${size.id}`}
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
