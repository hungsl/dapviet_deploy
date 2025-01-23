"use client";
import {
  ArrowDown,
  ArrowUp,
  Package,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPie } from "./chart-pie";
import { ChartLine } from "./chart-line";
import { useEffect, useState } from "react";
import dashboardApiRequest from "@/apiRequests/dashboard";
import { dataDashboard } from "../../types";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// interface DashboardData {
//   totalNewUsers: number;
//   totalOldUsers: number;
//   totalPendingOrders: number;
//   totalAwaitingPickupOrders: number;
//   totalAwaitingDeliveryOrders: number;
//   totalInTransitOrders: number;
//   totalDeliveredOrders: number;
//   totalCanceledOrders: number;
//   totalProductSell: number;
//   totalRevenueThisWeek: number;
//   totalRevenueLastWeek: number;
// }

// interface DashboardProps {
//   data: DashboardData;
// }

export function Dashboard() {
  const [data, setData] = useState<dataDashboard>();
  useEffect(() => {
    const fetchDashboard = async () => {
      const result = await dashboardApiRequest.getDashboard();
      setData(result.payload.data);
    };
    fetchDashboard();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen flex-col relative">
        <div className="absolute">Đang tải...</div>
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );

  const totalUsers = data.totalNewUsers + data.totalOldUsers;
  const totalOrders =
    data.totalPendingOrders +
    data.totalAwaitingPickupOrders +
    data.totalAwaitingDeliveryOrders +
    data.totalInTransitOrders +
    data.totalDeliveredOrders +
    data.totalCanceledOrders;

  const revenueChange =
    ((data.totalRevenueThisWeek - data.totalRevenueLastWeek) /
      data.totalRevenueLastWeek) *
    100;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Bảng Điều Khiển</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/staff/manage-user">
          <Card className="hover:shadow-md hover:scale-100 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng Người Dùng
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {data.totalNewUsers} người dùng mới
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/staff/manage-order">
          <Card className="hover:shadow-md hover:scale-100 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng Đơn Hàng
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {data.totalPendingOrders} đơn hàng đang chờ xử lý
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/staff/manage-product" className="h-full">
          <Card className="hover:shadow-md hover:scale-100 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sản Phẩm Đã Bán
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalProductSell}</div>
              <p className="text-xs text-muted-foreground">
                {data.totalCanceledOrders} đơn hàng đã hủy
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/staff/manage-revenue">
          <Card className="hover:shadow-md hover:scale-100 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Doanh Thu Tuần
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                { data.totalRevenueThisWeek ? formatCurrency(data.totalRevenueThisWeek) : <>đ 0.00</>}
              </div>
              <p className="text-xs text-muted-foreground">
                {revenueChange >= 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Tăng {revenueChange.toFixed(2)}% so với tuần trước
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    Giảm {Math.abs(revenueChange).toFixed(2)}% so với tuần trước
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartPie data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hàng tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartLine />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
