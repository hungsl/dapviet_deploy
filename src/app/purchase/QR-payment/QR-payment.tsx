import React, { useState, useEffect } from "react";
import styles from "./QrPayment.module.css";
import { usePopup } from "@/app/context/popup-provider";
import ButtonCancel from "./button-cancel";
import { useLoading } from "@/app/context/loading-provider";
import accountApiRequest from "@/apiRequests/account";
import { useAppContext } from "@/app/context/app-provider";
import { CheckoutOrderType } from "@/schemaValidations/cart";
import cartApiRequest from "@/apiRequests/cart";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

export const QrPayment: React.FC = () => {
  const { setContent } = usePopup();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const [body, setBody] = useState<CheckoutOrderType>();
  const { shippingFee, shippingMethod } = useAppContext();
  const [seconds, setSeconds] = useState(300); // Cập nhật thời gian còn lại là 5 phút (300 giây)
  const { setLoading } = useLoading();
  const [description, setDiscription] = useState<string | null>("");
  const [isChecking, setIsChecking] = useState(false);
  const myBank = {
    BANK_ID: "MB",
    ACCOUNT_NO: "85750686",
    Account_name: "Bui Viet Hung",
  };
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    if (isPaymentSuccess) return;
    const interval = setInterval(() => {
      handleCheckPaid();
    }, 1000);
    return () => clearInterval(interval);
  }, [description, totalPrice, isPaymentSuccess, isChecking]);

  // Hàm quay lại trang trước
  // const handleBack = () => {
  //   setContent("payment");
  // };

  // Cập nhật bộ đếm giây mỗi giây
  useEffect(() => {
    if (seconds === 0) {
      setContent("fail");
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000); // Cập nhật mỗi giây (1000ms)

    return () => clearInterval(timer);
  }, [seconds, setContent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Thực hiện các API call song song
        const [meResponse, cartResponse, descriptionResponse] =
          await Promise.all([
            accountApiRequest.meClient(),
            cartApiRequest.getListItemCart(),
            cartApiRequest.getIdOrder(),
          ]);

        // Lấy thông tin người dùng và lọc dữ liệu cần thiết
        const allowedKeys = [
          "email",
          "name",
          "province",
          "district",
          "address",
          "phone",
        ];
        const userData = meResponse.payload.data;
        const filteredData = Object.fromEntries(
          Object.entries(userData).filter(([key]) => allowedKeys.includes(key))
        );

        // Chuẩn bị body cho đơn hàng
        const body = {
          ...filteredData,
          shippingFee,
          shippingMethod,
          paymentMethod: "QR",
        } as CheckoutOrderType;
        setBody(body);

        // Tính tổng giá
        const cartItems = cartResponse.payload?.data || [];
        const totalCartPrice = cartItems.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
        setTotalPrice(totalCartPrice + shippingFee);

        // Lưu mô tả đơn hàng
        setDiscription(descriptionResponse.payload.data);

        // Lưu User ID
        setUserId(userData.id);

        // console.log("Order body:", body);
      } catch (error) {
        console.error("Error while processing order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shippingFee, shippingMethod]);

  // Tính toán phút và giây từ tổng số giây
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const createNotification = useMutation(api.notification.createNotification);
  const handleCheckPaid = async () => {
    if (isChecking || isPaymentSuccess) return; // Nếu đang xử lý, không thực hiện thêm

    try {
      const response = await fetch("https://oauth.casso.vn/v2/transactions", {
        method: "GET",
        headers: {
          Authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data.data.records);
      // const lastPaid = data.data.records[data.data.records.length - 1];
      const lastThreePaid = data.data.records.slice(-3);
      const isValid = lastThreePaid.some(
        (record: { amount: number; description: string }) =>
          record.amount >= totalPrice && record.description === description
      );
      // console.log(lastPaid);
      // console.log(lastPaid.description);
      // console.log(totalPrice)
      // console.log(description)
      // console.log(myBank.Description);
      if (isValid) {
        try {
          setIsChecking(true);
          setLoading(true);
          //     const simulateApiCall = (delay: number) => {//tesst
          //   return new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       // Giả lập thành công
          //       resolve({ payload: { message: "API call successful" } });
          //       // Hoặc giả lập lỗi
          //       // reject(new Error('API call failed'));
          //     }, delay); // Delay thời gian giả lập
          //   });
          // };
          //   const result = await simulateApiCall(10000);
          //   console.log(result);
          //   toast({
          //     duration: 2000,
          //     description: (result as any).payload.message,
          //   });
          ///////////////////////////////////////
          const result = await cartApiRequest.completeOrder(
            body as CheckoutOrderType
          );
          // console.log(result);
          toast({
            description: result.payload.message,
          });

          const notificationText = `Bạn đã thanh toán thành công, hóa đơn đặt hàng đã được gửi qua Email`;

          createNotification({
            text: notificationText,
            token: userId,
          });
          setIsPaymentSuccess(true);
        } catch (error) {
          console.error("Error while completing the order:", error);
        } finally {
          setContent("success");
          setLoading(false);
          setIsChecking(false);
        }
      } else {
        // console.log("khong co giao dich tuong ung");
      }
    } catch (error) {
      console.error("Error while checking payment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Quét mã để thanh toán</h1>
        <p className={styles.description}>
          <strong>
            không thay đổi số tiền và nội dung để chúng tôi có thể xác nhận
            thanh toán
          </strong>
        </p>
        <img
          loading="lazy"
          src={`https://img.vietqr.io/image/${myBank.BANK_ID}-${myBank.ACCOUNT_NO}-qr_only.png?amount=${totalPrice}&addInfo=${description}&accountName=${myBank.Account_name}`}
          alt="QR Code for payment completion"
          className={styles.qrCode}
        />
        {/* Hiển thị số tiền và nội dung thanh toán */}
        <div className={styles.paymentInfo}>
          <p>
            <strong>Số tiền:</strong> {formatCurrency(totalPrice)}
          </p>
          <p className="flex justify-center gap-3">
            <strong>Nội dung:</strong>{" "}
            <div className="text-orange-500">{description}</div>
          </p>
          <p>
            <strong>Người nhận:</strong> {myBank.Account_name}
          </p>
        </div>
        {/* Hiển thị thời gian theo định dạng phút:giây */}
        <p className={styles.countdown}>
          Thời gian còn lại: {minutes}:{remainingSeconds < 10 ? "0" : ""}
          {remainingSeconds}s
        </p>
      </div>
      <div className={styles.warningMessage}>
        Vui lòng không rời hoặc tải lại trang khi đang giao dịch
      </div>
      <ButtonCancel />
    </div>
  );
};
