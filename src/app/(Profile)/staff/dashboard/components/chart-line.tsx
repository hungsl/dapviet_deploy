'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Dữ liệu doanh thu
const chartData = [
  { week: 'Tuần trước', revenue: 3610000 },
  { week: 'Tuần này', revenue: 0 },
]

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function ChartLine() {
  // Tính toán tỷ lệ thay đổi doanh thu (%)
  const lastWeekRevenue = chartData[0].revenue
  const thisWeekRevenue = chartData[1].revenue
  const revenueChange = thisWeekRevenue - lastWeekRevenue
  const revenueChangePercent = parseFloat(
    ((revenueChange / (lastWeekRevenue || 1)) * 100).toFixed(1)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ đường - Doanh thu</CardTitle>
        <CardDescription>So sánh doanh thu tuần này và tuần trước</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {revenueChange > 0 ? (
                <>
                  Doanh thu tăng {revenueChangePercent}% so với tuần trước{' '}
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </>
              ) : revenueChange < 0 ? (
                <>
                  Doanh thu giảm {Math.abs(revenueChangePercent)}% so với tuần trước{' '}
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </>
              ) : (
                <>
                  Doanh thu không thay đổi{' '}
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              So sánh doanh thu giữa tuần trước và tuần này
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
