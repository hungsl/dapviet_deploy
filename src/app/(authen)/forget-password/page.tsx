"use client";
import { useForm } from "react-hook-form";
import styles from "./ForgetPassword.module.css";
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
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  forgetPasswordBody,
  forgetPasswordType,
} from "@/schemaValidations/auth.schema";
import authApiRequest from "@/apiRequests/auth";
import { useState } from "react";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export default function EmailForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<forgetPasswordType>({
    resolver: zodResolver(forgetPasswordBody),
    defaultValues: {
      auth: "",
    },
  });
  const onSubmit = async (data: forgetPasswordType) => {
    // console.log("Data:", data);
    try {
      if (loading) return;
      setLoading(true);
      const result = await authApiRequest.forgetPassword(data);
      console.log(result);
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
            <Link href="/login" className={styles.backLink}>
              ← Quay lại đăng nhập
            </Link>
            <h1 className={styles.formTitle}>Quên mật khẩu</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="auth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-black font-bold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@domain.com"
                        {...field}
                        className={styles.inputField}
                      />
                    </FormControl>
                    <FormDescription>
                      Nhập email của bạn để thay đổi mật khẩu
                    </FormDescription>
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
                Gửi
              </Button>
            </form>
          </div>
        </div>
      </Form>
    </div>
  );
}
