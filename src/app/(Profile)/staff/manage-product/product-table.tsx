"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../customer/history/RatingPage.module.css";
import ButtonDelete from "./ButtonDelete";
import Image from "next/image";
import productApiRequest from "@/apiRequests/product";
import { formatCurrency } from "@/lib/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ProductListResType } from "@/schemaValidations/product.schema";
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
import { useAppContext } from "@/app/context/app-provider";

export default function ProductTable() {
  const [data, setData] = useState<ProductListResType | null>(null);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("ASC");
  const [properties, setProperties] = useState("unitPrice");
  const [totalPages, setTotalPages] = useState(1);
  // const { accessToken } = useAppContext();
  const { isRefresh } = useAppContext();
  const fetchProducts = async () => {
    try {
      const result = await productApiRequest.productsStaff(
        {
          search,
          page: currentPage,
          size: 10,
          direction,
          properties,
          minPrice: minPrice ? parseInt(minPrice) : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        }
        // accessToken
      );
      setData(result.payload);
      // console.log(result.payload);
      setTotalPages(result.payload.totalPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, isRefresh]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // console.log(currentPage);
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
          className="border border-gray-300 bg-background text-foreground rounded px-2 py-1 mr-2"
        >
          <option value="name">Tên sản phẩm</option>
          <option value="unitPrice">Giá sản phẩm</option>
          <option value="createdDate">Ngày tạo</option>
        </select>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2 bg-background text-foreground"
        >
          <option value="ASC">Tăng dần</option>
          <option value="DESC">Giảm dần</option>
        </select>
        <input
          type="number"
          placeholder="Giá tối thiểu"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <input
          type="number"
          placeholder="Giá tối đa"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 ml-2"
        />
        <button
          onClick={fetchProducts}
          className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
        >
          Áp dụng
        </button>
      </div>
      <div className={`scroll  ${styles.heightTable} text-foreground`}>
        {/* Search and Filters */}

        <table className={styles.table}>
          <thead>
            <tr className={`${styles.tableRow} text-black`}>
              <th className={styles.tableHead}>Hình ảnh</th>
              <th className={styles.tableHead}>Tên sản phẩm</th>
              <th className={styles.tableHead}>Đánh giá</th>
              <th className={`${styles.tableHead} ${styles.textRight}`}>Giá</th>
              <th className={`${styles.tableHead} ${styles.textCenter}`}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((product) => (
              <tr key={product.id} className={styles.tableRow}>
                <td className={styles.Imgage}>
                  <Image
                    src={product.picture}
                    width={100}
                    height={100}
                    loading="lazy"
                    className="w-16 h-16 object-cover border rounded"
                    alt={product.name}
                  />
                </td>
                <td className={styles.tableCell}>{product.name}</td>
                <td className={`${styles.tableCell} ${styles.rating}`}>
                  {Array.from({ length: 5 }, (_, i) =>
                    i < Math.round(product.rating) ? (
                      <FaStar key={i} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-400" />
                    )
                  )}
                </td>
                <td className={`${styles.tableCell} ${styles.textRight}`}>
                  {formatCurrency(product.unitPrice)}
                </td>
                <td className={`${styles.tableCell} ${styles.textCenter}`}>
                  <ButtonDelete
                    productId={product.id}
                    isDelete={product.status === "DELETED"}
                  />
                  <Link
                    href={`/staff/manage-product/${product.id}`}
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
