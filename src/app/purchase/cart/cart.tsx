import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import cartApiRequest from "@/apiRequests/cart";
// import { useAppContext } from "@/app/context/app-provider";
import { CartListResType } from "@/schemaValidations/cart";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartListResType>();
  // const { accessToken } = useAppContext();
  const [loadings, setLoadings] = useState(false);
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  useEffect(() => {
    try {
      const getItemCart = async () => {
        const result = await cartApiRequest.getListItemCart();
        setCartItems(result.payload);
        // console.log(result.payload);
        const totalPrice = result.payload?.data?.reduce((total, item) => {
          return total + item.unitPrice * item.quantity;
        }, 0) || 0;
        setTotalPrice(totalPrice)
      };
      getItemCart();
    } catch (error) {
      console.log("lỗi khi lấy cart: ", error)
    }
  }, [isDelete]);

  const updateCartItems = async () => {
    try {
      setLoadings(true)
       const result = await cartApiRequest.getListItemCart();
      setCartItems(result.payload);
      const totalPrice = result.payload?.data?.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0) || 0;
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng", error);
    }finally{
      setLoadings(false)
    }
  };


  const handleDelete = async (productQuantityId : string, quantity: number) => {
    if(loadings) return;
    try {
      setLoadings(true);
      const body = {
        productQuantityId,
        quantity: quantity,
      };
      await cartApiRequest.removefromCart(body);
      setIsDelete(!isDelete)
    } catch (error) {
      console.log("lỗi khi xóa khỏi cart: ", error)
      toast({
        variant: "destructive",
        description: "Lỗi khi thêm sản phẩm",
        duration: 3000,
      });
    } finally {
      setLoadings(false);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartLayout}>
        <div className={styles.cartItemsColumn}>
          <div className={styles.cartItemsList}>
            {cartItems?.data && cartItems.data.length > 0 ? (
              cartItems.data.map((item, index) => (
                <CartItem key={index} {...item} onDelete={handleDelete} onUpdateCartItems = {updateCartItems} loadings ={loadings} setLoadings={setLoadings}/>
              ))
            ) : (
              <p className={styles.emptyCartMessage}>
                Hiện chưa có sản phẩm trong giở hàng.
              </p>
            )}
          </div>
        </div>

        <div className={styles.summaryColumn}>
          <CartSummary
            number={cartItems?.totalSize || 0}
            subtotal={formatCurrency(totalPrice) || "đ 0"}
            // tax="$0.00"
            shipping="đ0"
            total={formatCurrency(totalPrice ) || "đ 0"}
            loadings ={loadings} setLoadings={setLoadings}
          />
        </div>
      </div>
    </div>
  );
};
