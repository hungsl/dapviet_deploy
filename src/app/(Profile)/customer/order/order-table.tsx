"use client";
import React, { useEffect, useState } from "react";
import styles from "../history/RatingPage.module.css";
import Link from "next/link";
import orderApiRequest from "@/apiRequests/order";
import { OrdersListResType } from "@/schemaValidations/order.schema";
import { PackageOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function OrderTable() {
  const router = useRouter();
  const [data, setData] = useState<OrdersListResType | null>(null); // Lưu trữ dữ liệu

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await orderApiRequest.ordersList();
        setData(result.payload); // Lưu kết quả trả về vào state `data`
        // console.log(result.payload);
      } catch (err) {
        console.log("lỗi lấy danh sách đơn: ", err);
      }
    };

    fetchOrders();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
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
      case "CANCELED":
        return "Đã hủy";
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
      case "CANCELED":
        return styles.statusCancel;
      default:
        return styles.statusUnknown;
    }
  };
  return (
    <div className={`scroll ${styles.heightTable} text-foreground`}>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tableRow} text-black`}>
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
          {data && data.data.length > 0 ? (
            data.data.map((order) => (
              <tr key={order.orderId} className={`${styles.tableRow} hover:bg-accent`}>
                <td className={`${styles.tableCell} font-medium`}>
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
                <td
                  className={`${styles.tableCell} ${styles.textRight} text-xs`}
                >
                  {order.paymentMethod}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}  `}>
                  <span
                    className={`${styles.statusValue} ${getStatusClass(order.orderStatus)}`}
                  >
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
            ))
          ) : (
            <tr className="flex flex-col items-center justify-center text-center mt-10">
              <td colSpan={7} className="text-center py-4">
                <Card className="flex flex-col items-center justify-center text-center">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      Không tìm thấy đơn hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                      <PackageOpen className="h-20 w-20 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Hiện tại không có đơn hàng nào trong hệ thống. Các đơn
                        hàng sẽ xuất hiện ở đây sau khi được tạo.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/searchpage")}
                    >
                      Bắt đầu mua sắm
                    </Button>
                  </CardFooter>
                </Card>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
