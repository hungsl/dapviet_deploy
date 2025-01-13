import z from "zod";

export const StatisticsRes = z.object({
  data: z.object({
    totalNewUsers: z.number(),
    totalOldUsers: z.number(),
    totalPendingOrders: z.number(),
    totalAwaitingPickupOrders: z.number(),
    totalAwaitingDeliveryOrders: z.number(),
    totalInTransitOrders: z.number(),
    totalDeliveredOrders: z.number(),
    totalCanceledOrders: z.number(),
    totalSell: z.number(),
    totalRevenueThisWeek: z.number(),
    totalRevenueLastWeek: z.number(),
  }),
  message: z.string().nullable(),
});

export type StatisticsResType = z.TypeOf<typeof StatisticsRes>;
