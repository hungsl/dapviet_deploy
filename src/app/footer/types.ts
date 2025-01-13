export interface SocialMediaProps {
    src: string;
    alt: string;
    href: string
  }
  
  export interface FooterLinkProps {
    text: string;
    className?: string;
    address: string;
  }
  
  export interface FooterSectionProps {
    title: string;
    links: FooterLinkProps[];
  }