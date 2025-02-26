"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/app/(authen)/authen-style.module.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
// import { SocialLoginButton } from "@/components/buttonEffect/login-page/SocialLoginButton";
import { usePopup } from "@/app/context/popup-provider";
import PasswordInput from "@/components/common/password-input";
import Link from "next/link";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const { setContent } = usePopup();

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: RegisterBodyType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (loading) return;
      setLoading(true);
      const result = await authApiRequest.register(values);
      toast({
        description: result.payload.message,
        duration: 4000,
      });
      router.push("/login");
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }
  const handleToLogin = () => {
    setContent("login");
  };
  return (
    <div className={styles.RegisterForm}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-[800px]  flex-shrink-0 w-full "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground font-bold">
                  Địa chỉ Email
                </FormLabel>
                <FormLabel  className="hidden">
                  Tên người dùng
                </FormLabel>
                <FormControl>
                  <Input
                    className={styles.inputContainer}
                    placeholder="Email của bạn"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground font-bold">
                  Tên người dùng
                </FormLabel>
                <FormControl>
                  <Input
                    className={styles.inputContainer}
                    placeholder="Nhập tên người dùng..."
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground font-bold">
                  Mật khẩu
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Nhập mật khẩu ..."
                    field={field}
                    classNameInput={styles.fieldInputChangePassword}
                    classNameButton={styles.iconEyes}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground font-bold">
                  Xác nhận mật khẩu
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Xác nhận mật khẩu..."
                    field={field}
                    classNameInput={styles.fieldInputChangePassword}
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
            className={styles.loginButton}
          >
            {loading && <Loader2 className="animate-spin" />}
            Đăng ký
          </Button>
        </form>
      </Form>
      <div className={styles.registerPrompt}>
        <span>Đã có tài khoản?</span>

        {path === "/register" ? (
          <Link prefetch href="/login" className={styles.registerLink}>
            Đăng Nhập Ngay
          </Link>
        ) : (
          <div onClick={handleToLogin} className={styles.registerLink}>
            Đăng Nhập Ngay
          </div>
        )}
      </div>

      <div className={styles.socialLoginSection}>
        {/* <div className={styles.socialLoginTitleContainer}>
          <p className={styles.socialLoginTitle}>Đăng ký bằng cách khác</p>
        </div>
        <SocialLoginButton
          provider="Google"
          icon="/login/google.png"
          message="Đăng ký bằng"
        /> */}
        {/* <SocialLoginButton
          provider="Facebook"
          icon="/login/facebook.png"
          message="Đăng ký bằng"
        /> */}
      </div>
    </div>
  );
}
