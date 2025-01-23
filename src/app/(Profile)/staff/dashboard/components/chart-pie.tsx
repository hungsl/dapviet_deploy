"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dataDashboard } from "../../types";

// const chartData = [
//   { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
//   { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
//   { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
//   { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
//   { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
// ]
// const data = {
//     totalPendingOrders: 6,
//     totalAwaitingPickupOrders: 0,
//     totalAwaitingDeliveryOrders: 0,
//     totalInTransitOrders: 0,
//     totalDeliveredOrders: 9,
//     totalCanceledOrders: 1,
//   }

export function ChartPie({ data }: { data: dataDashboard }) {
  const chartData = [
    {
      status: "Đơn hàng chờ xử lý",
      orders: data.totalPendingOrders,
      fill: "var(--color-pending)",
    },
    {
      status: "Chờ nhận hàng",
      orders: data.totalAwaitingPickupOrders,
      fill: "var(--color-AwaitingPickup)",
    },
    {
      status: "Đang giao hàng",
      orders: data.totalAwaitingDeliveryOrders,
      fill: "var(--color-InTransit)",
    },
    {
      status: "Đang vận chuyển",
      orders: data.totalInTransitOrders,
      fill: "var(--color-AwaitingDelivery)",
    },
    {
      status: "Đã giao hàng",
      orders: data.totalDeliveredOrders,
      fill: "var(--color-Delivered)",
    },
    {
      status: "Đã hủy",
      orders: data.totalCanceledOrders,
      fill: "var(--color-Canceled)",
    },
  ];

  const chartConfig = {
    orders: {
      label: "Đơn hàng",
    },
    pending: {
      label: "Đơn hàng chờ xử lý",
      color: "hsl(var(--chart-1))",
    },
    AwaitingPickup: {
      label: "Chờ nhận hàng",
      color: "hsl(var(--chart-2))",
    },
    InTransit: {
      label: "Đang giao hàng",
      color: "hsl(var(--chart-3))",
    },
    AwaitingDelivery: {
      label: "Đang vận chuyển",
      color: "hsl(var(--chart-4))",
    },
    Delivered: {
      label: "Đã giao hàng",
      color: "hsl(var(--chart-5))",
    },
    Canceled: {
      label: "Đã hủy",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;
  const totalOrders = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.orders, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Biểu đồ tròn - Đơn hàng</CardTitle>
        <CardDescription>Thống kê theo trạng thái đơn hàng</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="orders"
              nameKey="status"
              innerRadius={60}
              strokeWidth={6}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tổng đơn hàng
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Đang thu thập dữ liệu... <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hiện tại chưa có đủ dữ liệu để hiển thị thống kê chi tiết.
        </div>
      </CardFooter>
    </Card>
  );
}
