"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLoading } from "@/app/context/loading-provider";
import accountApiRequest from "@/apiRequests/account";
import { UsersListResType } from "@/schemaValidations/account.schema";
import ButtonDelete from "./ButtonDelete";

export default function UserTable() {
  const [data, setData] = useState<UsersListResType | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  const [properties, setProperties] = useState("name");
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await accountApiRequest.getUsersList(
        search,
        currentPage,
        7,
        direction,
        properties
      );
      setData(result.payload);
      console.log(result.payload);
      setTotalPages(result.payload.totalPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, properties]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log(currentPage);
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="scroll max-h-[650px] text-foreground">
        {/* Search and Filters */}
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
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          >
            <option value="id">Id</option>
            <option value="name">Tên người dùng</option>
            <option value="email">Email</option>
            <option value="status">Trạng thái</option>
          </select>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          >
            <option value="ASC">Tăng dần</option>
            <option value="DESC">Giảm dần</option>
          </select>
          <button
            onClick={fetchUsers}
            className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
          >
            Áp dụng
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.tableHead}>Hình ảnh</th>
              <th className={styles.tableHead}>Tên người dùng</th>
              <th className={styles.tableHead}>Email</th>
              <th className={styles.tableHead}>Trạng thái</th>
              <th className={`${styles.tableHead} ${styles.textCenter}`}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((staff) => (
              <tr key={staff.id} className={styles.tableRow}>
                <td className={styles.image}>
                  <img
                    src={staff.avatar || "/userProfile.png"}
                    alt={staff.name || "Avatar"}
                    loading="lazy"
                    className="w-16 h-16 object-cover border rounded"
                  />
                </td>
                <td className={styles.tableCell}>{staff.name}</td>
                <td className={styles.tableCell}>{staff.email}</td>
                <td className={styles.tableCell}>
                  <span
                    className={`${
                      staff.status === "VERIFIED"
                        ? "text-green-500"
                        : staff.status === "UNVERIFIED" ? "text-gray-500" : "text-red-500"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className={`${styles.tableCell} ${styles.textCenter}`}>
                  <ButtonDelete
                    staffId={staff.id}
                  />
                  <Link
                    href={`/staff/manage-user/${staff.id}`}
                    className={styles.top}
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination className="mt-10">
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
    </>
  );
}
