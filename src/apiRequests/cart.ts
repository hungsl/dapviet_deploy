import http from "@/lib/http";
import { CartListResType, CartResType, CheckoutOrderType, DeliveryServiceListResType, ShippingValueDetailsType } from "@/schemaValidations/cart";

const cartApiRequest = {
    addToCart : (body : {productQuantityId: string, quantity: number}) => http.post<CartResType>('orders/carts',body),
    removefromCart : (body : {productQuantityId: string, quantity: number}) => http.delete<CartResType>('orders/carts',body),
    getListItemCart : () => http.get<CartListResType>('orders/carts'),
    getIdOrder : () => http.get<CartResType>('orders/check-id'),
    getListServiceTransfer : (body : ShippingValueDetailsType) => http.post<DeliveryServiceListResType>('viettel/services', body),
    completeOrder : (body : CheckoutOrderType) => http.post<CartResType>('orders/checkout', body),

}
export default cartApiRequest