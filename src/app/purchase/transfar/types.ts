export interface ShippingOption {
  MA_DV_CHINH: string;
  TEN_DICHVU: string;
  GIA_CUOC: number;
  THOI_GIAN: string;
  selected?: boolean;
}

export interface ShippingCardProps {
  option: ShippingOption;
  onSelect: (id: string) => void;
  options: string
}
