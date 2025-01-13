export interface SizeButtonProps {
    size: string;
    isSelected?: boolean;
    onClick?: () => void;
  }
  
  export interface QuantityControlProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
  }
  
  export interface DeliveryOptionProps {
    icon: string;
    text: string;
  }