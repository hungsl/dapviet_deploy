import React from "react";
import styles from "../history/RatingPage.module.css";
import Link from "next/link";
import { cookies } from "next/headers";
import orderApiRequest from "@/apiRequests/order";
import { OrdersListResType } from "@/schemaValidations/order.schema";
import { redirect } from "next/navigation";

export default async function OrderTable() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  let data: OrdersListResType | null = null;
  try {
    const result = await orderApiRequest.ordersList(accessToken?.value || "");
    // console.log("productdetail: ", result);
    data = result.payload;
  } catch (error) {
    console.log("lỗi lấy danh sách đơn: ", error)
    redirect("/homepage");
  }
  const translateStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Đang xử lý";
      case "AWAITING_PICKUP":
        return "Đợi lấy hàng";
      case "AWAITING_DELIVERY":
        return "Đợi chuyển hàng";
      case "IN_TRANSIT":
        return "Đang vận chuyển";
      case "DELIVERED":
        return "Đã nhận";
      default:
        return "Không xác định";
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return styles.statusPending;
      case "AWAITING_PICKUP":
        return styles.statusAwaitingPickup;
      case "AWAITING_DELIVERY":
        return styles.statusAwaitingDelivery;
      case "IN_TRANSIT":
        return styles.statusInTransit;
      case "DELIVERED":
        return styles.statusDelivered;
      default:
        return styles.statusUnknown;
    }
  };
  return (
    <div className="scroll max-h-[515px] text-foreground">
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHead}>Mã đơn hàng</th>
            <th className={styles.tableHead}>Người nhận</th>
            <th className={styles.tableHead}>Địa chỉ giao hàng</th>
            {/* <th className={styles.tableHead}>Ghi chú đơn hàng</th> */}
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Phương thức thanh toán
            </th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Trạng thái
            </th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Tổng tiền
            </th>
            <th className={`${styles.tableHead} ${styles.textCenter}`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((order) => (
            <tr key={order.orderId} className={styles.tableRow}>
              <td className={`${styles.tableCell} font-medium`}>
                {" "}
                {order.orderId.length > 10
                  ? `${order.orderId.slice(0, 9)}…`
                  : order.orderId}
              </td>
              <td className={`${styles.tableCell} ${styles.bold}`}>
                {order.name}
              </td>
              <td
                className={`${styles.tableCell} ${styles.bold} ${styles.italic}`}
              >
                {order.address}
              </td>
              {/* <td className={styles.tableCell}>{order.note}</td> */}
              <td className={`${styles.tableCell} ${styles.textRight} text-xs`}>
                {order.paymentMethod}
              </td>
              <td
                className={`${styles.tableCell} ${styles.textRight}  `}
              >
                <span className={`${styles.statusValue} ${getStatusClass(order.orderStatus)}`}>
                  {translateStatus(order.orderStatus)}
                </span>
              </td>
              <td className={`${styles.tableCell} ${styles.textRight}`}>
                đ{order.total}
              </td>
              <td className={`${styles.tableCell} ${styles.textCenter}`}>
                <Link
                  href={`/customer/order/${order.orderId}`}
                  className={styles.top}
                >
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
