"use client";
import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import ButtonDelete from "./button-delete";
import typesApiRequest from "@/apiRequests/type";
import { TypesListResType } from "@/schemaValidations/type.schema";
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
export default function CategoryTable() {
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<TypesListResType>();
  const [properties, setProperties] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [direction, setDirection] = useState("ASC");
  // const { accessToken } = useAppContext();
  const search =""
  const fetchProductDetail = async () => {
    try {
      const result = await typesApiRequest.typesList(
        currentPage,
        7,
        search,
        properties,
        direction
      );
      setData(result.payload);
      setTotalPages(result.payload.totalPage);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [currentPage, deleted]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log(currentPage);
      setCurrentPage(newPage);
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
    <div className="scroll max-h-[600px] text-foreground">
      <div className={styles.searchFilter}>
        <select
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        >
          <option value="id">ID</option>
          <option value="name">Tên danh mục</option>
          <option value="deleted">đã xóa</option>
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
          onClick={fetchProductDetail}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Áp dụng
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHead}>Mã danh mục</th>
            <th className={styles.tableHead}>Tên danh mục</th>
            <th className={styles.tableHead}>Trạng thái</th>
            <th className={`${styles.tableHead} ${styles.textCenter}`}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((category) => (
            <tr key={category.id} className={styles.tableRow}>
              <td className={`${styles.tableCell} font-medium`}>
                {category.id.length > 10
                  ? `${category.id.slice(0, 9)}…`
                  : category.id}
              </td>
              <td className={styles.tableCell}>{category.name}</td>
              <td className={styles.tableCell}>
                {category.deleted ? (
                  <span className="text-red-500 font-bold">Đã xóa</span>
                ) : (
                  <span className="text-green-500 font-bold">Hoạt động</span>
                )}
              </td>
              <td className={`${styles.tableCell} ${styles.textCenter}`}>
                <ButtonDelete
                  categoryId={category.id}
                  isDelete={category.deleted}
                  deleted={deleted}
                  setDeleted = {setDeleted}
                />
                {!category.deleted && (
                  <Link
                    href={`/staff/manage-category/${category.id}`}
                    className={styles.top}
                  >
                    Chỉnh sửa
                  </Link>
                )}
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
  );
}
