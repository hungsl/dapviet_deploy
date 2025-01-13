import http from "@/lib/http";
import { UpdateInfoOrderType } from "@/schemaValidations/account.schema";
import {
  OrderDetailsResType,
  OrdersCompletedListResType,
  OrdersListResType,
  StaffOrdersListResType,
  TransactionsListResType,
} from "@/schemaValidations/order.schema";

const orderApiRequest = {
  ordersList: () =>
    http.get<OrdersListResType>("orders/current?size=100"),
  updateOrderAddress: (id: string, data: UpdateInfoOrderType) =>
    http.put<OrdersListResType>(`/orders/${id}/staff`, data),

  ordersCompletedList: (
    page: number,
    size: number,
    direction: string
    // properties: string
  ) =>
    http.get<OrdersCompletedListResType>(
      `orders/order-details/current?page=${page}&size=${size}&direction=${direction}`
    ),
  staffOrdersList: (
    search = "",
    page = 1,
    size = 10,
    direction = "",
    properties = ""
  ) =>
    http.get<StaffOrdersListResType>(
      `/orders/staff?search=${search}&page=${page}&size=${size}&direction=${direction}&properties=${properties}`
    ),
  orderDetail: (id: string, accessToken: string) =>
    http.get<OrderDetailsResType>(`orders/${id}/order-details/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  staffOrderDetail: (id: string, accessToken: string) =>
    http.get<OrderDetailsResType>(`/orders/${id}/staff`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  staffOrderCancel: (id: string) =>
    http.delete<OrderDetailsResType>(`/orders/${id}/staff`, {}),
  staffNextStatusOrderDetail: (id: string, accessToken: string) =>
    http.put<OrderDetailsResType>(
      `/orders/${id}/next-status/staff`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
  staffPreviousStatusOrderDetail: (id: string, accessToken: string) =>
    http.put<OrderDetailsResType>(
      `/orders/${id}/previous-status/staff`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
  transactionsList: () =>
    http.get<TransactionsListResType>(`orders/transactions/current`),
};
export default orderApiRequest;
