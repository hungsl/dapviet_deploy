"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  updateInfoOrder,
  UpdateInfoOrderType,
} from "@/schemaValidations/account.schema";
import orderApiRequest from "@/apiRequests/order";
import { useLoading } from "@/app/context/loading-provider";
import { toast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

export function UpdateAddressOrder() {
  const path = usePathname();
  const orderId = path.split("/").pop();
  const { setLoading } = useLoading();
  const form = useForm<UpdateInfoOrderType>({
    resolver: zodResolver(updateInfoOrder),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      status: "PENDING",
    },
  });

  // Hàm gửi form
  const onSubmit = async (data: UpdateInfoOrderType) => {
    console.log(data);
    try {
      setLoading(true);
      const result = await orderApiRequest.updateOrderAddress(
        orderId || "",
        data
      );
      toast({
        duration: 3000,
        description: result.payload.message,
      });
    } catch (error) {
      console.error("Error handling action:", error);
      toast({
        variant: "destructive",
        duration: 3000,
        description:
          "Đã xảy ra lỗi khi cập nhật địa chỉ đơn hàng. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background p-10 w-[30%] rounded-md min-w-[290px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Email Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="nhập địa chỉ email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên người nhận</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên người nhận" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Input */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Select */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select {...field} className="input">
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
