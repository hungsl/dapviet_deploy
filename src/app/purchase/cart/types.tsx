export interface CartItemProps {
  productQuantityId: string;
  name: string;
  image: string;
  unitPrice: number;
  maxQuantity: number;
  weight: number;
  size: string;
  quantity: number;
  loadings: boolean;
  onDelete: (productQuantityId: string, quantity: number) => void;
  onUpdateCartItems: () => void;
  setIsMaxItem: (loadings: boolean) => void
  setLoadings: (loadings: boolean) => void
}

export interface CartSummaryProps {
  number: number;
  loadings: boolean;
  setLoadings: (loadings: boolean) => void
  subtotal: string | undefined;
  tax?: string;
  shipping: string;
  total: string|undefined;
  isMaxItem: boolean;
}
