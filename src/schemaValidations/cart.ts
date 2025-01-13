import z from "zod";

export const CartRes = z.object({
  data: z.string().nullable(),
  message: z.string(),
});
export type CartResType = z.TypeOf<typeof CartRes>;

export const CartItem = z.object({
  productQuantityId: z.string(),
  name: z.string(),
  image: z.string().url(),
  unitPrice: z.number(),
  maxQuantity: z.number(),
  weight: z.number(),
  size: z.string(),
  quantity: z.number(),
});

export const CartListRes = z.object({
  data: z.array(CartItem).nullable(),
  size: z.number(),
  page: z.number(),
  totalSize: z.number(),
  totalPage: z.number(),
  message: z.string().nullable(),
});

export const ExtraService = z.object({
  SERVICE_CODE: z.string(),
  SERVICE_NAME: z.string(),
});

export const DeliveryService = z.object({
  MA_DV_CHINH: z.string(),
  TEN_DICHVU: z.string(),
  GIA_CUOC: z.number(),
  THOI_GIAN: z.string(),
  EXCHANGE_WEIGHT: z.number(),
  EXTRA_SERVICE: z.array(ExtraService),
});

export const DeliveryServiceListRes = z.object({
  data: z.array(DeliveryService),
  message: z.string().nullable(),
});

export const ShippingValueDetails = z.object({
  provinceId: z.number(),
  districtId: z.number(),
  weight: z.number(),
  price: z.number(),
  moneyCollection: z.number(),
});

export const ShippingOption = z.array(
  z.object({
    MA_DV_CHINH: z.string(),
    TEN_DICHVU: z.string(),
    GIA_CUOC: z.number(),
    THOI_GIAN: z.string(),
  })
);
export const checkoutOrderSchema = z.object({
  email: z.string(),
  name: z.string(),
  province: z.string(),
  district: z.string(),
  address: z.string(),
  phone: z.string(),
  shippingFee: z.number(),
  shippingMethod: z.string(),
  paymentMethod: z.string(),
});

export type CheckoutOrderType = z.infer<typeof checkoutOrderSchema>;

export type ShippingOptionType = z.TypeOf<typeof ShippingOption>;

export type ShippingValueDetailsType = z.TypeOf<typeof ShippingValueDetails>;

export type DeliveryServiceListResType = z.TypeOf<
  typeof DeliveryServiceListRes
>;
export type CartListResType = z.TypeOf<typeof CartListRes>;
export type CartItemType = z.TypeOf<typeof CartItem>;
