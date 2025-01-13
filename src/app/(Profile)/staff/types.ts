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
  totalSell: number;
  totalRevenueThisWeek: number;
  totalRevenueLastWeek: number;
};
