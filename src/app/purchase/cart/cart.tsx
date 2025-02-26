import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import cartApiRequest from "@/apiRequests/cart";
// import { useAppContext } from "@/app/context/app-provider";
import { CartListResType } from "@/schemaValidations/cart";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
// import LoadingAnimation from "@/components/common/LoadingAnimation";
import { useLoading } from "@/app/context/loading-provider";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAppContext } from "@/app/context/app-provider";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartListResType>();
  // const { accessToken } = useAppContext();
  const { loading, setLoading } = useLoading();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isMaxItem, setIsMaxItem] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const state = useQuery(api.memory.getState);
  const { setIsRefresh, isRefresh } = useAppContext();
  useEffect(() => {
    try {
      setLoading(true);
      const getItemCart = async () => {
        const result = await cartApiRequest.getListItemCart();
        setCartItems(result.payload);
        // console.log(result.payload);
        console.log("cập nhật List: ");
        const totalPrice =
          result.payload?.data?.reduce((total, item) => {
            return total + item.unitPrice * item.quantity;
          }, 0) || 0;
        setTotalPrice(totalPrice);
      };
      getItemCart();
    } catch (error) {
      console.log("lỗi khi lấy cart: ", error);
    } finally {
      setLoading(false);
    }
  }, [isDelete, state?.clicked]);

  const updateCartItems = async () => {
    try {
      setLoading(true);
      const result = await cartApiRequest.getListItemCart();
      setCartItems(result.payload);
      const totalPrice =
        result.payload?.data?.reduce((total, item) => {
          return total + item.unitPrice * item.quantity;
        }, 0) || 0;
      setTotalPrice(totalPrice);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productQuantityId: string, quantity: number) => {
    try {
      setLoading(true);
      const body = {
        productQuantityId,
        quantity: quantity,
      };
      await cartApiRequest.removefromCart(body);
      setIsDelete(!isDelete);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log("lỗi khi xóa khỏi cart: ", error);
      toast({
        variant: "destructive",
        description: "Lỗi khi thêm sản phẩm",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.cartLayout}>
          <div className={styles.cartItemsColumn}>
            {/* <div className={styles.cartItemsList}>
              {cartItems.data && cartItems.data.length > 0 ? (
                cartItems.data.map((item, index) => (
                  <CartItem
                    key={index}
                    {...item}
                    onDelete={handleDelete}
                    onUpdateCartItems={updateCartItems}
                    loadings={loading}
                    setLoadings={setLoading}
                  />
                ))
              ) : (
                <p className={styles.emptyCartMessage}>
                  Hiện chưa có sản phẩm trong giở hàng.
                </p>
              )}
            </div> */}
            {cartItems ? (
              <div className={styles.cartItemsList}>
                {cartItems.data && cartItems.data.length > 0 ? (
                  cartItems.data.map((item, index) => (
                    <CartItem
                      key={index}
                      {...item}
                      onDelete={handleDelete}
                      onUpdateCartItems={updateCartItems}
                      loadings={loading}
                      setLoadings={setLoading}
                      setIsMaxItem={setIsMaxItem}
                    />
                  ))
                ) : (
                  <p className="flex flex-col items-center justify-center text-gray-500 py-6 h-[100%]">
                    <ShoppingCart size={48} className="text-gray-400 mb-2" />
                    <span className={styles.emptyCartMessage}>
                      Hiện chưa có sản phẩm trong giỏ hàng.
                    </span>
                  </p>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-screen flex-col relative">
                {/* Loading spinner */}
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                {/* Thông báo đang tải */}
                <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
              </div>
            )}
          </div>

          <div className={styles.summaryColumn}>
            <CartSummary
              number={cartItems?.totalSize || 0}
              subtotal={formatCurrency(totalPrice) || "đ 0"}
              // tax="$0.00"
              shipping="đ0"
              isMaxItem={isMaxItem}
              total={formatCurrency(totalPrice) || "đ 0"}
              loadings={loading}
              setLoadings={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
