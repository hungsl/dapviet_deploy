export interface ProductCardProps {
    id: string;
    imageUrl: string;
    title: string;
    price: string;
  }
  
  export interface ProductGridProps {
    products: ProductCardProps[];
  }