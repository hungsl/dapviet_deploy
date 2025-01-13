export interface ProductCardProps {
  name: string;
  unitPrice: number;
  id: string;
  picture: string;
  rating: number;
}

export interface ProductCardsProps {
  cards: ProductCardProps[];
}
