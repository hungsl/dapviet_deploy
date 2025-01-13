import React from "react";
import styles from "./ProductList.module.css";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { FilterState, ProductCardType } from "../types";
// import { ProductCard } from "./components/product-card";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("./components/product-card"), {
  ssr: false,
});

export default function ContentMain({
  searchInput,
  setSearchInput,
  handleSearch,
  toggleSortOrder,
  filters,
  productList,
  loading,
}: {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  handleSearch: () => void;
  toggleSortOrder: (sort: "asc" | "desc") => void;
  filters: FilterState;
  productList: ProductCardType | undefined;
  loading: boolean;
}) {
  return (
    <main className={styles.mainContent}>
      <div className={`${styles.toolbar} bg-background`}>
        <div className={`${styles.searchContainer}`}>
          <Input
            className={styles.searchInput}
            type="text"
            placeholder="Tìm kiếm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Xử lý khi nhấn Enter
          />
          <div onClick={() => handleSearch()} className={styles.searchIcon}>
            <IoSearch size={25} />
          </div>
        </div>
        <div className={styles.sortContainer}>
          {/* <SortSelect /> */}
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
      {!loading && productList ? (
        <div className={styles.productGrid}>
          {productList?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          {productList?.length === 0 && (
            <div className={styles.noProductsMessage}>
              Rất tiếc ! chúng tôi không tìm thấy sản phẩm nào.
            </div>
          )}
        </div>
      ) : (
        // <div className="flex justify-center items-center h-screen">
        //   <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        // </div>
        <div className={styles.svgWrapper}>
          <svg className={styles.svg} viewBox="0 0 100 100">
            <g
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="6"
            >
              {/* left line */}
              <path d="M 21 40 V 59">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  values="0 21 59; 180 21 59"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* right line */}
              <path d="M 79 40 V 59">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  values="0 79 59; -180 79 59"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* top line */}
              <path d="M 50 21 V 40">
                <animate
                  attributeName="d"
                  values="M 50 21 V 40; M 50 59 V 40"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* bottom line */}
              <path d="M 50 60 V 79">
                <animate
                  attributeName="d"
                  values="M 50 60 V 79; M 50 98 V 79"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* top box */}
              <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
                <animate
                  attributeName="stroke"
                  values="rgba(255,255,255,1); rgba(100,100,100,0)"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* middle box */}
              <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
              {/* bottom box */}
              <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
                <animate
                  attributeName="stroke"
                  values="rgba(100,100,100,0); rgba(255,255,255,1)"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 0 -19"
                dur="2s"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        </div>
      )}
    </main>
  );
}
