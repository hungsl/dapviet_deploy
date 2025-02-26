"use client";
import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import { TransactionItemList } from "@/schemaValidations/order.schema";
import orderApiRequest from "@/apiRequests/order";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function PaymentTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  const [totalPages, setTotalPages] = useState(1);
  const [payments, setPayments] = useState<TransactionItemList | null>(null);

  const fetchTransactions = async () => {
    try {
      const result = await orderApiRequest.transactionsList(
        currentPage,
        7,
        direction,
        'createdDate'
      );
      setPayments(result.payload.data);
      setTotalPages(result.payload.totalPage);
    } catch (err) {
      console.log("lỗi lấy danh sách giao dịch: ", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (!payments)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
      <div className={`${styles.searchFilter} py-5 flex justify-center`}>
        {/* <select
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
          className="border border-gray-300 text-foreground rounded px-2 py-1 mr-2"
        >
          <option value="createdDate">Ngày đặt hàng</option>
        </select> */}
        <span className="border border-gray-300 text-foreground  rounded px-2 py-1.5 mr-2">
          Ngày đặt hàng
        </span>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border border-gray-300 rounded text-foreground px-2 py-1 mr-2"
        >
          <option value="DESC">Mới nhất</option>
          <option value="ASC">Cũ nhất</option>
        </select>
        <button
          onClick={fetchTransactions}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Áp dụng
        </button>
      </div>
      <div className={`${styles.outline} scroll`}>
        {payments && payments.length > 0 ? (
          payments.map((payment) => (
            <div className={styles.container} key={payment.orderId}>
              <div className={styles.paymentCard}>
                <div className={styles.infoSection}>
                  <div className={styles.infoItem}>
                    <strong>Mã đơn hàng:</strong>
                    <span
                      className={`${styles.infoValue} ${styles.titleOrder}`}
                    >
                      {payment.orderId}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Ngày tạo đơn hàng:</strong>
                    <span className={styles.infoValue}>
                      {formatDate(payment.orderCreatedDate)}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Ngày thanh toán:</strong>
                    <span className={styles.infoValue}>
                      {formatDate(payment.paymentDate)}
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
          <div className="flex flex-col items-center justify-center text-center">
            <Card className="flex flex-col items-center justify-center text-center max-w-[700px]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Không có giao dịch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <CreditCard className="h-20 w-20 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Hiện tại không có giao dịch nào để hiển thị. Lịch sử giao
                    dịch của bạn sẽ xuất hiện ở đây khi bạn bắt đầu mua sắm hoặc
                    nhận thanh toán.
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
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-10 text-foreground">
          <PaginationContent>
            {/* Nút Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "disabled" : ""}
              />
            </PaginationItem>

            {/* Hiển thị trang đầu tiên và dấu ... nếu cần */}
            {currentPage > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* Hiển thị các trang xung quanh trang hiện tại */}
            {Array.from({ length: 5 })
              .map((_, index) => currentPage - 2 + index) // Tạo dãy trang xung quanh
              .filter((page) => page >= 1 && page <= totalPages) // Lọc bỏ trang đầu tiên và trang cuối
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Hiển thị trang cuối cùng và dấu ... nếu cần */}
            {currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Nút Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "disabled" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
