export const INITIAL_FILTER_STATE = {
  categories: [],
  sizes: [],
  priceRanges: [],
  minPrice: "",
  maxPrice: "",
  searchQuery: "",
  sortOrder: "asc" as const,
};

export const FILTER_ITEMS = [
  { label: "Áo Dài", count: "80" },
  { label: "Áo Bà Ba", count: "68" },
  { label: "Áo Yếm", count: "54" },
  { label: "Áo Sơ Mi Truyền Thống", count: "12" },
  { label: "Váy Dài", count: "32" },
  { label: "Áo Khoác Truyền Thống", count: "10" },
  { label: "Quần Âu Việt Nam", count: "21" },
  { label: "Chân Váy Truyền Thống", count: "12" },
  { label: "Áo Gấm", count: "7" },
  { label: "Đầm Lụa", count: "5" },
  { label: "Phụ Kiện Truyền Thống", count: "3" },
];

export const SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const PRICE_RANGES = [
  "10.000 - 100.000 VND",
  "100.000 - 999.000 VND",
  "1000.000 - 1999.000 VND",
  "2000.000 VND trở lên",
];

export const MOCK_PRODUCTS = Array(15)
  .fill(null)
  .map((_, index) => ({
    id: `product-${index}`,
    imageUrl: "/searchpage/shoes.png",
    title: "Man White Shoes",
    rating: 4,
    price: "$19.9",
  }));

