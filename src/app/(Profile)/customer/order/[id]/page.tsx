import React from "react";
import styles from "../Order.module.css"; // Import CSS Module
import Link from "next/link";
import { cookies } from "next/headers";
import orderApiRequest from "@/apiRequests/order";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const unwrappedParams = await params;
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
  let order;
  try {
    const result = await orderApiRequest.orderDetail(
      unwrappedParams.id,
      accessToken?.value || ""
    );
    // console.log("productdetail: ", result);
    order = result.payload.data;
  } catch (error) {
    console.log("lỗi lấy chi tiết đơn hàng: ", error);
    redirect("/homepage");
  }
  return (
    <div className={`${styles.parent} scroll`}>
      <div className={styles.container}>
        {/* Header */}
        <div className="text-center my-4">
          <Link
            href={"/customer/order"}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Trở lại danh sách</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Chi tiết đơn hàng</h1>
        </div>

        {/* Thông tin người nhận và giao hàng */}
        <div className={styles.infoSection}>
          {/* Trạng thái đơn hàng */}
          <div className={styles.statusSection}>
            <strong>Trạng thái đơn hàng:</strong>{" "}
            <span
              className={`${styles.statusValue} ${getStatusClass(order.status)}`}
            >
              {translateStatus(order.status)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>OrderId:</strong>
            <span className={styles.infoValue}>
              <strong>{order.id}</strong>
            </span>
          </div>
          <div className={styles.infoItem}>
            <strong>Địa chỉ giao hàng:</strong>
            <span className={styles.infoValue}>{order.address}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Người nhận:</strong>
            <span className={styles.infoValue}>{order.name}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Số điện thoại:</strong>
            <span className={styles.infoValue}>{order.phone}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Phương thức thanh toán:</strong>
            <span className={styles.infoValue}>{order.paymentMethod}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Phí vận chuyển:</strong>
            <span className={styles.infoValue}>{order.shippingFee} VND</span>
          </div>
        </div>

        {/* Danh sách sản phẩm trong đơn hàng */}
        <div className={styles.sectionTitle}>Sản phẩm trong đơn hàng</div>
        <div className={`${styles.tableOrder} scroll`}>
          <table className={`${styles.table} scroll`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Kích thước</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(order.details).map(([key, product], index) => (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src="https://aekqgmlegdfbpjvohkqg.supabase.co/storage/v1/object/public/hung-pics/0589cff1-d7d2-4751-b798-9972219c0d75.jpeg"
                      alt={product.productName}
                      className={styles.productImage}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.size}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unitPrice} VND</td>
                  <td>{product.quantity * product.unitPrice} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Tổng tiền đơn hàng */}
        <div className={`${styles.totalAmount} mb-5 !mt-10`}>
          <p>
            <strong>Tổng cộng:</strong> {order.productTotal + order.shippingFee}{" "}
            VND
          </p>
        </div>
      </div>
    </div>
  );
}
