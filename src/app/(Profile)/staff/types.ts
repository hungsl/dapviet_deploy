export interface StatCardProps {
  title: string;
  value: number;
  className?: string;
}

export interface ChartLegendItemProps {
  color: string;
  label: string;
}

export interface BarChartProps {
  data: {
    value: number;
    primaryBar: number;
    secondaryBar: number;
  }[];
}

export interface PieChartProps {
  oldCustomers: number;
  newCustomers: number;
}
export interface LegendItemProps {
  icon: string;
  label: string;
}

export interface BarProps {
  height: number;
  color: string;
  label: number;
}

export interface YAxisLabelProps {
  value: number;
  marginTop?: number;
}
export interface CustomerStatProps {
  percentage: string;
  label: string;
  color: string;
}

// revenue
export interface BarChartDataPoint {
  currentValue: number;
  previousValue: number;
}

export interface RevenueProps {
  amount: number;
  percentageChange: number;
  chartData: BarChartDataPoint[];
}

export type ProductType = {
  id: string;
  name: string;
  deleted: boolean;
};

export type ProductCollection = {
  id: string;
  name: string;
  description: string;
  images: string[];
  deleted: boolean;
};

export type CollectionsType = ProductCollection[];

export type Types = ProductType[];

export type SizeQuantities = {
  [key: string]: number;
};

export type dataDashboard = {
  totalNewUsers: number;
  totalOldUsers: number;
  totalPendingOrders: number;
  totalAwaitingPickupOrders: number;
  totalAwaitingDeliveryOrders: number;
  totalInTransitOrders: number;
  totalDeliveredOrders: number;
  totalCanceledOrders: number;
  totalProductSell: number;
  totalRevenueThisWeek: number;
  totalRevenueLastWeek: number;
};

export type dataUserDetail = {
  id: string; // id là kiểu string (UUID)
  name: string;
  dob: string; // dob là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
  gender: "OTHER" | "MALE" | "FEMALE"; // Giả sử giới tính chỉ có những giá trị này
  email: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  avatar: string;
  role: string; // Giả sử các giá trị này cho role
  status: string; // Giả sử các giá trị này cho status
  createdBy: string;
  createdDate: string; // createdDate là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
  updatedBy: string;
  updatedDate: string; // updatedDate là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
};
export type UploadImageResponse = {
  success: boolean;
  files: {
    data: {
      key: string;
      url: string;
      appUrl: string;
      name: string;
      size: number;
      type: string;
    };
    error: null | string;
  }[];
};
export type DeleteImagesResponse = {
  success: boolean;
  messages: string;
};
