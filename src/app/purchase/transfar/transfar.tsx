import React, { useEffect, useState } from "react";
import styles from "../checkout/Checkout.module.css";
import { ShippingMethod } from "./shipping-method";
import { StepIndicator } from "../checkout/step-indicator";
import { useAppContext } from "@/app/context/app-provider";
import cartApiRequest from "@/apiRequests/cart";
import { SummaryTranfer } from "./summary-trafer";
import { CartListResType, ShippingOptionType } from "@/schemaValidations/cart";

export const Transfer = ({ method }: { method: string | undefined }) => {
  // const { accessToken } = useAppContext();
  const [cartItems, setCartItems] = useState<CartListResType>();
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [totalWeight, setTotalWeight] = useState<number | undefined>(0);
  const { shippingDetails } = useAppContext();
  const [shippingOptionDisplay, setShippingOptionDisplay] =
    useState<ShippingOptionType>([]);
  const [options, setOptions] = useState<string>("");
  const [feeShip, setFeeShip] = useState<number>(0);

  useEffect(() => {
    try {
      const getItemCart = async () => {
        const result = await cartApiRequest.getListItemCart();
        setCartItems(result.payload);
        // console.log(result.payload);
        const totalPrice = result.payload?.data?.reduce((total, item) => {
          return total + item.unitPrice * item.quantity;
        }, 0);
        const totalWeight = result.payload?.data?.reduce((total, item) => {
          return total + item.weight;
        }, 0);
        setTotalWeight(totalWeight);
        setTotalPrice(totalPrice);
      };
      getItemCart();
    } catch (error) {
      console.log("error getListCart: ", error);
    }
  }, []);

  useEffect(() => {
    const fetchShippingService = async () => {
      try {
        const body = {
          ...shippingDetails,
          weight: totalWeight || 0,
          price: totalPrice || 0,
          moneyCollection: method === "cod" ? totalPrice || 0 : 0,
        };
        const result = await cartApiRequest.getListServiceTransfer(body);
        const ShippingOptionDisplay = result.payload.data.map((item) => ({
          MA_DV_CHINH: item.MA_DV_CHINH,
          TEN_DICHVU: item.TEN_DICHVU,
          GIA_CUOC: item.GIA_CUOC,
          THOI_GIAN: item.THOI_GIAN,
        }));
        setShippingOptionDisplay(ShippingOptionDisplay);
        // console.log('Shipping service display:', ShippingOptionDisplay);
      } catch (error) {
        console.log("Error in service transfer:", error);
      }
    };
    fetchShippingService();
  }, [totalPrice, totalWeight, method, shippingDetails]);

  return (
    <div className={`${styles.container} scroll`}>
      <div className={styles.content}>
        <div className={styles.formColumn}>
          <div className={styles.stepIndicators}>
            <StepIndicator number="1" label="Giỏ Hàng" isActive={false} />
            <StepIndicator number="2" label="Thông Tin" isActive={false} />
            <StepIndicator
              number="3"
              label="Loại Thanh Toán"
              isActive={false}
            />
            <StepIndicator number="4" label="Vận Chuyển" isActive={true} />
            <div className={styles.lineIndicator}>-</div>
          </div>

          <ShippingMethod
            ShippingOption={shippingOptionDisplay}
            method={method || ""}
            setOptions={setOptions}
            options={options}
            feeShip={feeShip}
            setFeeShip={setFeeShip}
          />
        </div>
        <div className={styles.summaryColumn}>
          <SummaryTranfer
            cartItems={cartItems}
            totalPrice={totalPrice || 0}
            feeShip={feeShip}
          />
        </div>
      </div>
    </div>
  );
};
