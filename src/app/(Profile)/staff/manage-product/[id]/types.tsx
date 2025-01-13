export interface ProductDetail {
    id: number;
    name: string;
    price: number;
    status: string;
    quantity: number;
    sizes: string[];
    colors: string[];
    imageUrl: string;
  }
  export interface ProductPageProps {
    product: ProductDetail;
  }