"use client";
import React, { useEffect, useState } from "react";
import { useProductFilters } from "./hooks/useProductFilters";
import { SIZES, PRICE_RANGES } from "./constants";
import styles from "./ProductList.module.css";
// import { PriceInput } from "./components/price-input";
// import { PriceRange } from "./components/price-range";
// import { SizeFilter } from "./components/size-filter";
// import { FilterItem } from "./components/filter-item";
import productApiRequest from "@/apiRequests/product";
import { MdDeleteOutline } from "react-icons/md";
import { CategoryType, ProductCardType } from "../types";
import { RiFilterOffFill } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import ContentMain from "./content-main";
import dynamic from "next/dynamic";
// import LoadingAnimation from "@/components/common/LoadingAnimation";
// import ContentMain from "./content-main";

const FilterItem = dynamic(() => import("./components/filter-item").then(mod => mod.FilterItem), { ssr: false });
const PriceInput = dynamic(() => import("./components/price-input").then(mod => mod.PriceInput), { ssr: false });
const PriceRange = dynamic(() => import("./components/price-range").then(mod => mod.PriceRange), { ssr: false });
const SizeFilter = dynamic(() => import("./components/size-filter").then(mod => mod.SizeFilter), { ssr: false });
const ContentMain = dynamic(() => import("./content-main"), { ssr: false });
const Pagination = dynamic(() => import("@/components/ui/pagination").then(mod => mod.Pagination), { ssr: false });
const PaginationContent = dynamic(() => import("@/components/ui/pagination").then(mod => mod.PaginationContent), { ssr: false });
const PaginationEllipsis = dynamic(() => import("@/components/ui/pagination").then(mod => mod.PaginationEllipsis), { ssr: false });
const PaginationItem = dynamic(() => import("@/components/ui/pagination").then(mod => mod.PaginationItem), { ssr: false });
const PaginationLink = dynamic(() => import("@/components/ui/pagination").then(mod => mod.PaginationLink), { ssr: false });
const PaginationNext = dynamic(() => import("@/components/ui/pagination").then(mod => mod.PaginationNext), { ssr: false });
const PaginationPrevious = dynamic(() => import("@/components/ui/pagination").then(mod => mod.PaginationPrevious), { ssr: false });
const  ProductList = () => {
  const {
    filters,
    toggleCategory,
    toggleSize,
    toggleSortOrder,
    updatePriceRange,
    updateSearch,
    resetFilters,
  } = useProductFilters();
  const [productList, setProductList] = useState<ProductCardType>();
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<CategoryType>();
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchProductList = async () => {
      const params = {
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
        sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
        types: filters.categories.length > 0 ? filters.categories : undefined,
        collections: undefined,
        page: currentPage,
        size: 12,
        direction: filters.sortOrder.toUpperCase(),
        search: filters.searchQuery || undefined,
      };
      try {
        setLoading(true);
        // console.log(`/products?` + // test link api products
        // `search=${params.search || ""}` +
        // `&minPrice=${params.minPrice || ""}` +
        // `&maxPrice=${params.maxPrice || ""}`+
        // `${params.sizes?.map((size) => `&sizes=${size}`).join("") || ""}` +
        // `${params.types?.map((type) => `&types=${type}`).join("") || ""}` +
        // `&collections=${params.collections || ""}` +
        // `&page=${params.page || ""}` +
        // `&size=${params.size || ""}` +
        // `&direction=${params.direction || ""}` +
        // `&properties=unitPrice` )
        const result = await productApiRequest.products(params);
        setProductList(result.payload.data);
        setTotalPages(Math.ceil(result.payload.totalSize / 20));
        // console.log("Fetched Products:", result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductList();
  }, [filters, currentPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Thêm 'smooth' để cuộn mượt mà
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    scrollToTop();
  };
  
  const handleSearch = () => {
    console.log(searchInput);
    updateSearch(searchInput);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await productApiRequest.category();
      setCategories(result.payload.data);
      // const testDoubledCategories = [...result.payload.data, ...result.payload.data, ...result.payload.data];
      // setCategories(testDoubledCategories)
    };
    fetchCategory();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={`${styles.mobileOpenButton} fixed bottom-4 right-4`}
          onClick={toggleSidebar}
        >
          {!isSidebarOpen ? (
            <FaFilter color="#87CEEB" size={25} />
          ) : (
            <RiFilterOffFill color="#87CEEB" size={25} />
          )}
          <h1>Bộ lọc</h1>
        </div>
        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        >
          <div className={styles.filterHeader}>
            <div className={styles.filterTitle}>Bộ lọc</div>
            <button
              className={styles.resetButton}
              onClick={resetFilters}
              aria-label="Reset filters"
            >
              Đặt Lại
            </button>
          </div>
          {/* Hiển thị các giá trị đã chọn */}
          <div className={styles.selectedFilters}>
            {Object.entries(filters).map(([key, value]) => {
              if (
                key === "sortOrder" ||
                !value ||
                (Array.isArray(value) && value.length === 0)
              )
                return null; // Bỏ qua giá trị của 'sortOrder' và các giá trị rỗng hoặc mảng trống

              const values = Array.isArray(value) ? value : [value]; // Đảm bảo mọi giá trị đều thành mảng

              return values.map((val, idx) => (
                <div key={`${key}-${idx}`} className={styles.filterTag}>
                  <span>{val}</span>
                </div>
              ));
            })}
          </div>
          {/* Kết thúc phần hiển thị giá trị đã chọn */}
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader}>
              <div>Loại Sản Phẩm</div>
            </div>
            <div className={styles.filterList}>
              {categories?.map((item, key) => (
                <FilterItem
                  key={key}
                  {...item}
                  isSelected={filters.categories.includes(item.name)}
                  onChange={toggleCategory}
                />
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader}>
              <div>Kích cỡ</div>
            </div>
            <div className={styles.sizeGrid}>
              {SIZES.map((size) => (
                <SizeFilter
                  key={size}
                  size={size}
                  isSelected={filters.sizes.includes(size)}
                  onSelect={toggleSize}
                />
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader}>
              <div>Mức Giá</div>
            </div>
            <div className={styles.priceRangeInputs}>
              <PriceInput
                value={filters.minPrice || ""}
                onChange={(value) => updatePriceRange(value, filters.maxPrice)}
              />
              <div className={styles.priceSeparator} />
              <PriceInput
                value={filters.maxPrice || ""}
                onChange={(value) => updatePriceRange(filters.minPrice, value)}
              />
              <MdDeleteOutline
                onClick={() => updatePriceRange("", "")}
                className="cursor-pointer"
              />
            </div>
            {/* Danh sách khoảng giá */}
            <div className={styles.priceRangeList}>
              {PRICE_RANGES.map((range) => {
                // Clean the range label to extract minPrice and maxPrice
                const cleanedLabel = range.replace(" VND", "");
                const [rangeMin, rangeMax] = cleanedLabel
                  .split(" - ")
                  .map((price) =>
                    price.trim() === "trở lên"
                      ? Infinity
                      : parseFloat(
                          price.replace(".", "").replace("trở lên", "").trim()
                        )
                  );

                // Convert filters.minPrice and filters.maxPrice to numbers
                const filterMin =
                  parseFloat(
                    filters.minPrice.replace(".", "").replace(" VND", "").trim()
                  ) || 0;
                const filterMax =
                  parseFloat(
                    filters.maxPrice.replace(".", "").replace(" VND", "").trim()
                  ) || Infinity;
                // Check if the current price range is selected
                const isSelected =
                  filterMin === rangeMin &&
                  (rangeMax === undefined
                    ? filterMax === Infinity
                    : filterMax === rangeMax);

                return (
                  <PriceRange
                    key={range}
                    label={range}
                    isSelected={isSelected}
                    onChange={(min, max) => {
                      // Kiểm tra nếu range là khoảng "2.000.000 VND trở lên"
                      if (max === "Infinity") {
                        updatePriceRange(min, max); // Cập nhật minPrice và maxPrice là Infinity
                      } else {
                        updatePriceRange(min, max); // Cập nhật giá trị thực tế của minPrice và maxPrice
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </aside>
        {/* {loading && <LoadingAnimation />} */}
        {/* <main className={styles.mainContent}>
          <div className={`${styles.toolbar} bg-background`}>
            <div className={`${styles.searchContainer}`}>
              <Input
                className={styles.searchInput}
                type="text"
                placeholder="Tìm kiếm"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <div onClick={() => handleSearch()} className={styles.searchIcon}>
                <IoSearch size={25} />
              </div>
            </div>
            <div className={styles.sortContainer}>
              
              <div className="flex justify-end">
                <h3 className={styles.noWrapText}>Sắp Xếp:</h3>
                <select
                  className={styles.sortSelect}
                  value={filters.sortOrder}
                  onChange={(e) =>
                    toggleSortOrder(e.target.value as "asc" | "desc")
                  }
                  aria-label="Sort products"
                >
                  <option value="asc">Thấp -&gt; Cao</option>
                  <option value="desc">Cao -&gt; Thấp</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.productGrid}>
            {productList?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </main> */}
        <ContentMain
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          toggleSortOrder={toggleSortOrder}
          filters={filters}
          productList={productList}
          loading={loading}
        />
      </div>
      <div className="mt-10"></div>
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
export default ProductList;