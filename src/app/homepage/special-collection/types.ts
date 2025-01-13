export interface FestivalCardProps {
    imageSrc: string;
    iconSrc: string;
    title: string;
    description: string;
  }
  
  export interface FestivalGridProps {
    items: FestivalCardProps[];
  }