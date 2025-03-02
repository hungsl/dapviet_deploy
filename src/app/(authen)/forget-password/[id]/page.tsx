"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../ForgetPassword.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  resetPasswordBody,
  resetPasswordBodyType,
} from "@/schemaValidations/auth.schema";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import PasswordInput from "@/components/common/password-input";
import authApiRequest from "@/apiRequests/auth";
import Link from "next/link";

export default function ResetPasswordForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [loading, setLoading] = useState(false);
  const unwrappedParams = React.use(params);
  const form = useForm<resetPasswordBodyType>({
    resolver: zodResolver(resetPasswordBody),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: resetPasswordBodyType) => {
    const value = {
      ...data,
      auth: unwrappedParams.id,
    };
    try {
      if (loading) return;
      setLoading(true);
      const result = await authApiRequest.resetPassword(value);
      // console.log(result);
      toast({
        description: result.payload.message,
        duration: 4000
      });
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            {/* Nút quay lại */}
            <Link href="/dang-nhap" className={styles.backLink}>
              ← Quay lại đăng nhập
            </Link>
            <h1 className={styles.formTitle}>Cập nhật mật khẩu</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* New Password Field */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Mật khẩu mới
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Nhập mật khẩu mới"
                        field={field}
                        classNameInput={styles.inputField}
                        classNameButton={styles.iconEyes}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Xác nhận mật khẩu
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Nhập lại mật khẩu"
                        field={field}
                        classNameInput={styles.inputField}
                        classNameButton={styles.iconEyes}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                type="submit"
                className={styles.submitButton}
              >
                {loading && <Loader2 className="animate-spin" />}
                Gửi Cập nhật mật khẩu
              </Button>
            </form>
          </div>
        </div>
      </Form>
    </div>
  );
}
