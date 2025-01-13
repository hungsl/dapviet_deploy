"use client";
import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import { TransactionItemList } from "@/schemaValidations/order.schema";
import orderApiRequest from "@/apiRequests/order";
import { formatCurrency } from "@/lib/utils";

export default function PaymentTable() {
  const [payments, setPayments] = useState<TransactionItemList | null>(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const result = await orderApiRequest.transactionsList();
        setPayments(result.payload.data); // Lưu kết quả vào state payments
      } catch (err) {
        console.log("lỗi lấy danh sách giao dịch: ", err);
      }
    };

    fetchTransactions();
  }, []);
  if (!payments)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  return (
    <div className={`${styles.outline} scroll`}>
      {payments && payments.length > 0 ? (
        payments.map((payment) => (
          <div className={styles.container} key={payment.orderId}>
            <div className={styles.paymentCard}>
              <div className={styles.infoSection}>
                <div className={styles.infoItem}>
                  <strong>Mã đơn hàng:</strong>
                  <span className={`${styles.infoValue} ${styles.titleOrder}`}>
                    {payment.orderId}
                  </span>
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
        ))
      ) : (
        <div className="text-center p-4">
          Không có giao dịch nào để hiển thị.
        </div>
      )}
    </div>
  );
}
