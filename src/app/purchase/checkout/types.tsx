export interface ProductItemProps {
    imageSrc: string;
    title: string;
    price: string;
    color: string;
    size: string;
  }
  
  export interface StepIndicatorProps {
    number: string;
    label: string;
    isActive: boolean;
  }
  
  export interface AddressFormData {
    email: string;
    name: string;
    address: string;
    city: string;
    district: string;
    phone: string;
  }