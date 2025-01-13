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
import orderApiRequest from "@/apiRequests/order";
// import { useAppContext } from "@/app/context/app-provider";
import { OrdersCompletedListResType } from "@/schemaValidations/order.schema";

export default function PurchaseHistoryTable() {
  const [data, setData] = useState<OrdersCompletedListResType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  // const [properties, setProperties] = useState("email");
  const [totalPages, setTotalPages] = useState(1);
  // const { accessToken } = useAppContext();
  const fetchOrders = async () => {
    try {
      const result = await orderApiRequest.ordersCompletedList(
        currentPage,
        3,
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
          <tr className={styles.tableRow}>
            <th className={styles.tableHead}>Hình ảnh</th>
            <th className={styles.tableHead}>Tên sản phẩm</th>
            <th className={styles.tableHead}>Phương thức thanh toán</th>
            <th className={styles.tableHead}>Số sản phẩm</th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>Giá</th>
            <th className={`${styles.tableHead} ${styles.textRight}`}>
              Tổng thanh toán
            </th>
            <th className={`${styles.tableHead} ${styles.textCenter}`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.data.length > 0 ? (
            data.data.map((item) => (
              <tr key={item.orderDetailId} className={styles.tableRow}>
                <td className={styles.Imgage}>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                </td>
                <td className={`${styles.tableCell} font-medium`}>
                  {item.name}
                </td>
                <td className={styles.tableCell}>{item.paymentMethod}</td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  x{item.quantity}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  đ{item.unitPrice}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  đ{item.unitPrice * item.quantity}
                </td>
                <td className={`${styles.tableCell} ${styles.textCenter}`}>
                  <Link
                    href={`/customer/feedback/view/${item.orderDetailId}`}
                    className={styles.top}
                  >
                    Xem Đánh Giá
                  </Link>
                  <Link
                    href={`/customer/history/${item.orderDetailId}`}
                    className={styles.buttom}
                  >
                    Đánh Giá
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-4">
                <div className="scenebox">
                  <div className="shadowbox"></div>
                  <div className="jumperbox">
                    <div className="spinnerbox">
                      <div className="scalerbox">
                        <div className="loaderbox">
                          <div className="cuboidbox">
                            <div className="cuboid__sidebox"></div>
                            <div className="cuboid__sidebox"></div>
                            <div className="cuboid__sidebox"></div>
                            <div className="cuboid__sidebox"></div>
                            <div className="cuboid__sidebox"></div>
                            <div className="cuboid__sidebox"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                Không có lịch sử mua hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
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
    </div>
  );
}
