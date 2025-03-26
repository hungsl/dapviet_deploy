import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface SocialMediaProps {
    src: IconDefinition;
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