export interface HeroContentProps {
  title: string;
  description: string;
}

export interface HeroProps {
  backgroundImageUrl: string;
  content: HeroContentProps;
}

export interface SizeFilterProps {
  size: string;
  isSelected?: boolean;
  onSelect?: (size: string) => void;
}

export interface PriceRangeProps {
  label: string;
  isSelected?: boolean;
  onChange?: (min: string, max: string) => void;
}

export interface PriceInputProps {
  value: string ;
  onChange: (value: string) => void;
}

export interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
}

export interface FilterState {
  categories: string[];
  sizes: string[];
  priceRanges: string[];
  minPrice: string;
  maxPrice: string;
  searchQuery: string;
  sortOrder: "asc" | "desc";
}
export type ProductCardType = {
  id: string;
  name: string;
  unitPrice: number;
  picture: string;
  rating: number;
}[];
export interface ProductCardProps {
  id: string;
  name: string;
  unitPrice: number;
  picture: string;
  rating: number;
}
export type CategoryType = {
  id: string;
  name: string;
  deleted: boolean;
}[];
export interface CategoryProps {
  id: string;
  name: string;
  deleted: boolean;
  onChange?: (label: string) => void;
  isSelected?: boolean;
}

