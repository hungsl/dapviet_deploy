import React from "react";
import styles from "./Payment.module.css";
import { cookies } from "next/headers";
import { TransactionItemList } from "@/schemaValidations/order.schema";
import orderApiRequest from "@/apiRequests/order";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default async function PaymentTable() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  let payments: TransactionItemList | null = null;
  try {
    const result = await orderApiRequest.transactionsList(
      accessToken?.value || ""
    );
    // console.log("transactionsList: ", result);
    payments = result.payload.data;
  } catch (error) {
    console.log("lỗi lấy danh sách giao dịch: ",error)
    redirect("/homepage");
  }

  return (
    <div className={`${styles.outline} scroll`}>
      {/* Danh sách các khoản thanh toán */}
      {payments.map((payment) => (
        <div className={styles.container} key={payment.orderId}>
          <div className={styles.paymentCard}>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <strong>Mã đơn hàng:</strong>
                <span className={`${styles.infoValue} ${styles.titleOrder}`}>{payment.orderId}</span>
              </div>
              <div className={styles.infoItem}>
                <strong>Ngày tạo đơn hàng:</strong>
                <span className={styles.infoValue}>
                  {
                    new Date(payment.orderCreatedDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </span>
              </div>
              <div className={styles.infoItem}>
                <strong>Ngày thanh toán:</strong>
                <span className={styles.infoValue}>
                  {new Date(payment.paymentDate).toISOString().split("T")[0]}
                </span>
              </div>

              <div className={styles.infoItem}>
                <strong>Phương thức thanh toán:</strong>
                <span className={styles.infoValue}>
                  {payment.paymentMethod}
                </span>
              </div>
              <div className={styles.infoItem}>
                <strong>Phí vận chuyển:</strong>
                <span className={`${styles.infoValue} ${styles.feeShip}`}>
                  {formatCurrency(payment.shippingFee)}
                </span>
              </div>
            </div>

            <div
              className={`${styles.totalAmount} ${
                payment.paymentStatus ? "" : styles.unpaid
              }`}
            >
              <p>
                <strong>
                  {payment.paymentStatus
                    ? "Số tiền đã thanh toán:"
                    : "Số tiền chưa thanh toán:"}
                </strong>{" "}
                {formatCurrency(payment.totalTransaction)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
