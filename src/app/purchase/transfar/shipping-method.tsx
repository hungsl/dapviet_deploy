import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import { ShippingOption } from "./types";
import { ShippingCard } from "./shipping-card";
import { usePopup } from "@/app/context/popup-provider";
import {
  CheckoutOrderType,
  ShippingOptionType,
} from "@/schemaValidations/cart";
import { toast } from "@/hooks/use-toast";
import cartApiRequest from "@/apiRequests/cart";
import { useAppContext } from "@/app/context/app-provider";
import accountApiRequest from "@/apiRequests/account";
import { useLoading } from "@/app/context/loading-provider";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const ShippingMethod = ({
  ShippingOption,
  method,
  setOptions,
  options,
  feeShip,
  setFeeShip,
}: {
  ShippingOption: ShippingOptionType;
  method: string;
  setOptions: (selectedId: string) => void;
  options: string;
  feeShip: number;
  setFeeShip: (feeShip: number) => void;
}) => {
  const { setLoading } = useLoading();
  const { setShippingFee, setShippingMethod } = useAppContext();
  const [nameService, setNameService] = useState<string>("");
  const { setContent } = usePopup();
  const handleBackToInfor = () => {
    setContent("payment");
  };
  console.log("options: ",options);
  console.log("feeShip: ", feeShip);

  const createNotification = useMutation(api.notification.createNotification);
  const handleNextToPayment = async () => {
    if (!options) {
      toast({
        variant: "destructive",
        description: "Hãy chọn phương thức vận chuyển",
        duration: 3000,
      });
      return;
    }

    if (method === "cod") {
      try {
        setLoading(true);
        const me = await accountApiRequest.meClient();
        const allowedKeys = [
          "email",
          "name",
          "province",
          "district",
          "address",
          "phone",
        ];
        const filteredData = Object.fromEntries(
          Object.entries(me.payload.data).filter(([key]) =>
            allowedKeys.includes(key)
          )
        );
        // const shippingDetail: ShippingOption | undefined = ShippingOption.find(
        //   (value) => value.MA_DV_CHINH === options
        // );
        const body = {
          ...filteredData,
          shippingFee: feeShip,
          shippingMethod: nameService,
          paymentMethod: method.toUpperCase(),
        } as CheckoutOrderType;
        console.log(body);
        const result = await cartApiRequest.completeOrder(body);
        toast({
          duration: 2000,
          description: result.payload.message,
        });
        const notificationText = `Bạn đã đặt hàng thành công, hóa đơn đặt hàng đã được gửi qua Email`;
        createNotification({
          text: notificationText,
          token: me.payload.data.id,
        });
        setContent("success");
      } catch (error) {
        console.error("Error while processing order:", error);
      } finally {
        setLoading(false);
      }
    } else if (method === "qr") {
      const shippingDetail: ShippingOption | undefined = ShippingOption.find(
        (value) => value.MA_DV_CHINH === options
      );
      setShippingFee(shippingDetail?.GIA_CUOC || 0);
      setShippingMethod(shippingDetail?.TEN_DICHVU || "");
      setContent("qrpage");
    }
  };

  const handleSelect = (selectedId: string) => {
    const shippingDetail: ShippingOption | undefined = ShippingOption.find(
      (value) => value.MA_DV_CHINH === selectedId
    );
    setFeeShip(shippingDetail?.GIA_CUOC || 0);
    setNameService(shippingDetail?.TEN_DICHVU || "");
    setOptions(selectedId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Phương Thức Vận Chuyển</div>
      <div className={styles.content}>
        <div className={styles.optionsContainer}>
          {ShippingOption.map((option) => (
            <ShippingCard
              key={option.MA_DV_CHINH}
              option={option}
              onSelect={handleSelect}
              options={options || ""}
            />
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={handleBackToInfor} className={styles.backButton}>
            Quay lại
          </button>
          <button
            onClick={handleNextToPayment}
            className={styles.continueButton}
          >
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};
