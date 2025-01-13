export interface ButtonProps {
    variant: 'primary' | 'secondary';
    children: React.ReactNode;
    onClick?: () => void;
  }