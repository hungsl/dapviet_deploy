import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import cartApiRequest from "@/apiRequests/cart";
// import { useAppContext } from "@/app/context/app-provider";
import { toast } from "@/hooks/use-toast";
import { CartItemProps } from "./types";
import { formatCurrency } from "@/lib/utils";
import { MdDeleteOutline } from "react-icons/md";

export const CartItem: React.FC<CartItemProps> = ({
  productQuantityId,
  name,
  image,
  unitPrice,
  maxQuantity,
  size,
  quantity,
  onDelete,
  onUpdateCartItems,
  setLoadings,
  setIsMaxItem,
  loadings,
}) => {
  // const { accessToken } = useAppContext();
  const [newQuantity, setNewQuantity] = useState<number>(quantity);
  const handleAddQuantityChange = async (index: number) => {
    if(loadings) return
    if (newQuantity >= maxQuantity) {
      toast({
        variant:'destructive',
        description:"Sản phẩm đã đạt số lượng tối đa",
        duration: 2000
      })
      return;
    }
    setNewQuantity(index);
    try {
      setLoadings(true);
      const body = {
        productQuantityId,
        quantity: 1,
      };
      // console.log(body);
      await cartApiRequest.addToCart(body);
      onUpdateCartItems();
      // console.log(result);
    } catch (error) {
      console.log("Lỗi khi thêm vào cart: ", error);
      toast({
        variant: "destructive",
        description: "Lỗi khi thêm sản phẩm",
        duration: 3000,
      });
    } finally {
      setLoadings(false);
    }
  };
  const handleSubtractQuantityChange = async (index: number) => {
    if(loadings) return
    if (index < 1) {
      onDelete(productQuantityId, quantity)
      return;
    }
    setNewQuantity(index);
    try {
      setLoadings(true);
      const body = {
        productQuantityId,
        quantity: 1,
      };
      // console.log(body);
      await cartApiRequest.removefromCart(body);
      onUpdateCartItems();
      // console.log(result);
    } catch (error) {
      console.log("Lỗi khi xóa khỏi cart: ", error);
      toast({
        variant: "destructive",
        description: "Lỗi khi thêm sản phẩm",
        duration: 3000,
      });
    } finally {
      setLoadings(false);
    }
  };
  useEffect(() => {
    if (maxQuantity < newQuantity) {
      setIsMaxItem(true);
    } else {
      setIsMaxItem(false);
    }
  }, [newQuantity, maxQuantity]);

  return (
    <div className={styles.cartItem}>
      <img
        loading="lazy"
        src={image}
        alt={`${name} product image`}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <div className={styles.productHeader}>
          <h3 className={styles.productTitle}>{name}</h3>
          <span className={styles.productPrice}>
            {formatCurrency(unitPrice)}
          </span>
        </div>
        <div className={styles.productOptions}>
          <div
            className={`${styles.quality} ${maxQuantity < newQuantity && styles.alertText}`}
          >
            <span>{`số lượng còn lại: ${maxQuantity}`}</span>
            <span>
              {`${size} `}/{` x${newQuantity}`}
            </span>
          </div>
          <div className={styles.quantityControls}>
            <div className={styles.quantityWrapper}>
              <button
                className={`${styles.quantityButton}`}
                onClick={() => handleSubtractQuantityChange(newQuantity - 1)}
                aria-label="Decrease quantity"
                // disabled={newQuantity <= 1 || loadings}
              >
                -
              </button>
              <span className={styles.quantity}>{newQuantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => handleAddQuantityChange(newQuantity + 1)}
                aria-label="Increase quantity"
                // disabled={quantity >= maxQuantity || loadings}
              >
                +
              </button>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(productQuantityId, quantity)}
              disabled={loadings}
              aria-label="Remove item"
            >
              <MdDeleteOutline size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
