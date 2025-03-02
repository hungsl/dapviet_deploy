"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./RatingPage.module.css";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import orderApiRequest from "@/apiRequests/order";
// import { useAppContext } from "@/app/context/app-provider";
import { OrdersCompletedListResType } from "@/schemaValidations/order.schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PurchaseHistoryTable() {
  const [data, setData] = useState<OrdersCompletedListResType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  const router = useRouter();
  // const [properties, setProperties] = useState("email");
  const [totalPages, setTotalPages] = useState(1);
  // const { accessToken } = useAppContext();
  const fetchOrders = async () => {
    try {
      const result = await orderApiRequest.ordersCompletedList(
        currentPage,
        5,
        direction
        // properties
      );
      setData(result.payload);
      // console.log(result.payload);
      setTotalPages(result.payload.totalPage);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  return (
    <div className={`scroll ${styles.heightTable} text-foreground`}>
      <div className={styles.searchFilter}>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        >
          <option value="ASC">Tăng dần</option>
          <option value="DESC">Giảm dần</option>
        </select>
        <button
          onClick={fetchOrders}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Áp dụng
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tableRow} text-black`}>
            <th className={styles.tableHead}>Hình ảnh</th>
            <th className={styles.tableHead}>Tên sản phẩm</th>
            <th className={styles.tableHead}>Phương thức thanh toán</th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Kích cỡ
            </th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Số sản phẩm
            </th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>Giá</th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Tổng thanh toán
            </th>
            <th className={`${styles.tableHead} ${styles.textCenter}`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="scroll">
          {data && data.data.length > 0 ? (
            data.data.map((item) => (
              <tr key={item.orderDetailId} className={`${styles.tableRow} hover:bg-accent`}>
                <td className={styles.Imgage}>
                  <Image
                    src={item.image}
                    loading="lazy"
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                </td>
                <td className={`${styles.tableCell} font-medium`}>
                  {item.name}
                </td>
                <td className={`${styles.tableCell} ${styles.textCenter}`}>
                  {item.paymentMethod}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  {item.size}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  x{item.quantity}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  đ{item.unitPrice}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  đ{item.unitPrice * item.quantity}
                </td>
                <td
                  className={`${styles.tableCell} ${styles.textCenter}`}
                >
                  {item.feedback ? (
                    <>
                      <Link
                        href={`/customer/feedback/view/${item.orderDetailId}`}
                        className={styles.top}
                      >
                        Xem Đánh Giá
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={{
                        pathname: `/customer/history/${item.orderDetailId}`,
                        query: { product: item.productId },
                      }}
                      className={`${styles.buttom} whitespace-nowrap`}
                    >
                      Đánh Giá
                    </Link>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="flex flex-col items-center justify-center text-center mt-10">
              <td colSpan={8}>
                <Card className="flex flex-col items-center justify-center text-center">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      Không có lịch sử mua hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                      <ShoppingBag className="h-20 w-20 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Bạn chưa có giao dịch mua hàng nào. Hãy bắt đầu mua sắm
                        để xem lịch sử giao dịch của bạn!
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/kham-pha")}
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
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-10 mb-10">
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
    </div>
  );
}
