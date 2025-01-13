"use client";
import orderApiRequest from "@/apiRequests/order";
import { useLoading } from "@/app/context/loading-provider";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonStatus({
  id,
  accessToken,
  text,
  action,
}: {
  id: string;
  accessToken: string;
  text: string;
  action: string;
}) {
  const router = useRouter();
  const { setLoading } = useLoading();
  const handleAction = async () => {
    try {
      setLoading(true);
      if (action === "previous") {
        const result = await orderApiRequest.staffPreviousStatusOrderDetail(
          id,
          accessToken
        );
        toast({
          duration: 3000,
          description: result.payload.message,
        });
      } else if (action === "next") {
        const result = await orderApiRequest.staffNextStatusOrderDetail(
          id,
          accessToken
        );
        toast({
          duration: 3000,
          description: result.payload.message,
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Error handling action:", error);
      toast({
        variant: "destructive",
        duration: 3000,
        description:
          "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };
  return <Button onClick={handleAction}>{text}</Button>;
}
