"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  changePasswordBody,
  changePasswordBodyType,
} from "@/schemaValidations/auth.schema";
import styles from "./UserProfile.module.css";
import { toast } from "@/hooks/use-toast";
import { usePopup } from "@/app/context/popup-provider";
import { useState } from "react";
import PasswordInput from "@/components/common/password-input";
import { Loader2 } from "lucide-react";
import authApiRequest from "@/apiRequests/auth";
// import { useAppContext } from "@/app/context/app-provider";
import { handleErrorApi } from "@/lib/utils";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const { closePopup } = usePopup();
  // const { accessToken } = useAppContext();
  
  const form = useForm<changePasswordBodyType>({
    resolver: zodResolver(changePasswordBody),
    defaultValues: {
      auth: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: changePasswordBodyType) => {
    console.log("Đổi mật khẩu thành công:", data);
    try {
      if (loading) return;
      setLoading(true);
      const body = {
        value: data,
      };
      const result = await authApiRequest.changePassword(body);
      console.log("result: ", result);
      toast({
        description: result.payload.message,
        duration: 3000,
      });
      closePopup()
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.changepasswordcontainer}>
      <h1 className={styles.textpassword}>Đổi Mật Khẩu</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="auth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.fieldLabelChangePassword}>
                  Mật khẩu hiện tại
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Nhập mật khẩu hiện tại"
                    field={field}
                    classNameInput={styles.fieldInputChangePassword}
                    classNameButton={styles.iconEyes}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.fieldLabelChangePassword}>
                  Mật khẩu mới
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Nhập mật khẩu mới"
                    field={field}
                    classNameInput={styles.fieldInputChangePassword}
                    classNameButton={styles.iconEyes}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.fieldLabelChangePassword}>
                  Xác nhận mật khẩu mới
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Xác nhận mật khẩu mới"
                    field={field}
                    classNameInput={styles.fieldInputChangePassword}
                    classNameButton={styles.iconEyes}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              disabled={loading}
              type="submit"
              className={`${styles.editButton} mt-4`}
            >
              {loading && <Loader2 className="animate-spin" />}
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
