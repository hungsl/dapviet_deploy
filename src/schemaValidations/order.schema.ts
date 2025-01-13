import z from "zod";

export const OrdersListRes = z.object({
  data: z.array(
    z.object({
      orderId: z.string(),
      name: z.string(),
      address: z.string(),
      paymentMethod: z.string(),
      orderStatus: z.string(),
      total: z.number(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export type OrdersListResType = z.TypeOf<typeof OrdersListRes>;

export const OrdersCompletedListRes = z.object({
  data: z.array(
    z.object({
      orderId: z.string(),
      orderDetailId: z.string(),
      image: z.string(),
      name: z.string(),
      paymentMethod: z.string(),
      size: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    })
  ),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export type OrdersCompletedListResType = z.TypeOf<typeof OrdersCompletedListRes>;


export const StaffOrdersListRes = z.object({
  data: z.array(
    z.object({
      id: z.string(), 
      email: z.string().email(),
      productTotal: z.number(), 
      shippingFee: z.number(),
      shippingMethod: z.string(), 
      paymentMethod: z.string(), 
      status: z.string(),
    })
  ),
  size: z.number(), 
  page: z.number(), 
  totalSize: z.number(),
  totalPage: z.number(), 
  message: z.string().nullable(),
});

export type StaffOrdersListResType = z.TypeOf<typeof StaffOrdersListRes>;

export const OrderDetailsRes = z.object({
  data: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    productTotal: z.number(),
    shippingFee: z.number(),
    shippingMethod: z.string(),
    paymentMethod: z.string(),
    status: z.string(),
    details: z.record(
      z.string(),
      z.object({
        productName: z.string(),
        productImage: z.array(z.string()),
        size: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
      })
    ),
  }),
  message: z.string(),
});

export type OrderDetailsResType = z.TypeOf<typeof OrderDetailsRes>;

export const TransactionItemListSchema = z.array(
  z.object({
    orderId: z.string(),
    paymentMethod: z.string(),
    paymentStatus: z.boolean(),
    paymentDate: z.string(),
    orderCreatedDate: z.string(),
    shippingFee: z.number(),
    totalTransaction: z.number(),
  })
);

export const TransactionsListRes = z.object({
  data: TransactionItemListSchema,
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export type TransactionItemList = z.infer<typeof TransactionItemListSchema>;
export type TransactionsListResType = z.infer<typeof TransactionsListRes>;
