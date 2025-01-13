export interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  borderRadius?: string;
}
export interface GalleryColumnProps {
  images: GalleryImageProps[];
}
export interface CommitmentItemProps {
  number: string;
  title: string;
  description: string;
}
export interface CommitmentsProps {
  heading: string;
  items: CommitmentItemProps[];
}
export interface AboutContentProps {
  title: string;
  description: string;
}

export interface AboutSectionProps {
  content: AboutContentProps[];
  tagline: string;
  imageSrc: string;
}
export interface ImageProps {
  src: string;
  alt: string;
}

export interface HistoricalImageProps {
  images: ImageProps[];
}

export interface ContentSectionProps {
  title: string;
  description: string;
}
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  icon: string;
  text: string;
  alt: string;
}
