export interface FestivalCardProps {
  id: string;
  name: string;
  description: string;
  images: string[]; // Mảng các chuỗi (URLs)
  deleted: boolean;
}

export interface data{
  id: string;
  name: string;
  images: string;
}
  export interface datalist{
    cards: data[];
  }
  export interface FestivalCardsProps {
    cards: FestivalCardProps[];
  }