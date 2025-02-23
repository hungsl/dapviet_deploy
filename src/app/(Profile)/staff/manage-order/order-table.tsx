"use client";
import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import { formatCurrency } from "@/lib/utils";
import orderApiRequest from "@/apiRequests/order";
import { StaffOrdersListResType } from "@/schemaValidations/order.schema";
import { useEffect, useState } from "react";
// import { useAppContext } from "@/app/context/app-provider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ButtonCancel from "./button-cancel";
import { useAppContext } from "@/app/context/app-provider";

export default function OrderTable() {
  const [data, setData] = useState<StaffOrdersListResType | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  const [properties, setProperties] = useState("email");
  const [totalPages, setTotalPages] = useState(1);
  const {isRefresh} = useAppContext()
  // const { accessToken } = useAppContext();
  const fetchOrders = async () => {
    try {
      const result = await orderApiRequest.staffOrdersList(
        search,
        currentPage,
        7,
        direction,
        properties
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
  }, [currentPage,isRefresh]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
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
  if (!data)
    return (
    <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Loading</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin">
        </div>
      </div>
    );
  return (
    <>
      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <select
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
          className="border border-gray-300 text-foreground rounded px-2 py-1 mr-2"
        >
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="shippingFee">Phí vận chuyển</option>
          <option value="shippingMethod">Phương thức vận chuyển</option>
          <option value="paymentMethod">Phương thức thanh toán</option>
        </select>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border border-gray-300 rounded text-foreground px-2 py-1 mr-2"
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
      <div className={`scroll ${styles.heightTable} text-foreground`}>
        {/* Search and Filters */}

        <table className={styles.table}>
          <thead>
            <tr className={`${styles.tableRow} text-black`}>
              <th className={styles.tableHead}>Mã đơn hàng</th>
              <th className={styles.tableHead}>Email</th>
              <th className={`${styles.tableHead} ${styles.textRight}`}>
                Giá sản phẩm
              </th>
              <th className={`${styles.tableHead} ${styles.textRight}`}>
                Phí vận chuyển
              </th>
              <th className={`${styles.tableHead} ${styles.textRight}`}>
                Phương thức vận chuyển
              </th>
              {/* <th className={`${styles.tableHead} ${styles.textRight}`}>
                Phương thức thanh toán
              </th> */}
              <th className={`${styles.tableHead} ${styles.textCenter}`}>
                Trạng thái
              </th>
              <th className={`${styles.tableHead} ${styles.textCenter}`}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((order) => (
              <tr key={order.id} className={styles.tableRow}>
                <td className={`${styles.tableCell} font-medium`}>
                  {order.id.length > 10 ? `${order.id.slice(0, 9)}…` : order.id}
                </td>
                <td className={styles.tableCell}>{order.email.length > 22 ? `${order.email.slice(0,22)}...`: order.email}</td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  {formatCurrency(order.productTotal)}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  {formatCurrency(order.shippingFee)}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  {order.shippingMethod}
                </td>
                {/* <td className={`${styles.tableCell} ${styles.textRight}`}>
                  {order.paymentMethod}
                </td> */}
                <td className={`${styles.tableCell} ${styles.textCenter}  `}>
                  <span
                    className={`${styles.statusValue} ${getStatusClass(order.status)}`}
                  >
                    {translateStatus(order.status)}
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.textCenter}`}>
                  {order.status !== "CANCELED" && (
                    <ButtonCancel orderId={order.id} />
                  )}
                  <Link
                    href={`/staff/manage-order/${order.id}`}
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
