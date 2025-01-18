"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
// import { useLoading } from "@/app/context/loading-provider";
import { SocialLoginButton } from "@/components/buttonEffect/login-page/SocialLoginButton";
import { usePopup } from "@/app/context/popup-provider";
import PasswordInput from "@/components/common/password-input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import LoadingAnimation from "@/components/common/LoadingAnimation";
import { useAppContext } from "@/app/context/app-provider";

export default function LoginForm() {
  const [loadings, setLoadings] = useState(false);
  const [loading, setLoading] = useState(false)
  const path = usePathname();
  const { setContent, closePopup } = usePopup();
  const searchParams = useSearchParams();
  const redirectFrom = searchParams.get("redirectFrom");
  const token = searchParams.get("token");
  const { toast } = useToast();
  const router = useRouter();
  const {setIsLoggedIn} = useAppContext();
  // const { setAccessToken, setRefreshToken } = useAppContext();
  
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const callVerify = async () => {
      if (!token) return;
      try {
        setLoading(true); 
        const result = await authApiRequest.verifyEmail(token)
        toast({
          description: result.payload.message,
          duration: 2000,
        });
      } catch (error) {
        console.error("Verification error:", error);
        toast({
          description: "Đã xảy ra lỗi trong quá trình xác minh. Vui lòng thử lại.",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      callVerify();
    }
  }, [token]);

  useEffect(() => {
    if (redirectFrom === "/logout") {
      toast({
        title: "Đăng xuất thành công.",
        duration: 2000,
      });
    }
  }, [redirectFrom]);
  
  async function onSubmit(values: LoginBodyType) {
    try {
      if (loadings) return;
      setLoadings(true);
      setLoading(true)
      const result = await authApiRequest.login(values);
      // console.log("result login: ", result);
      await authApiRequest.auth({
        accessToken: result.payload.data.accessToken,
        refreshToken: result.payload.data.refreshToken,
      });
      toast({
        description: result.payload.message,
        duration: 2000,
      });
      // setAccessToken(result.payload.data.accessToken);
      // setRefreshToken(result.payload.data.refreshToken);
      localStorage.setItem('accessToken', result.payload.data.accessToken)
      localStorage.setItem('refreshToken', result.payload.data.refreshToken)
      if(path !=="/login"){
        // router.refresh()
        setIsLoggedIn(true)
        closePopup();
      }else{
        router.push("/homepage");
      }
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 2000,
      });
    } finally {
      setLoading(false)
      setLoadings(false);
    }
  }
  const handleToRegister = () => {
    setContent("register");
  };
  const handleForgetPassword = () => {
    closePopup();
    router.push("/forget-password");
  };
  return (
    <div className={styles.loginForm}>
      {loading && <LoadingAnimation/>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold mb-2">
                  {" "}
                  Địa chỉ Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className={styles.inputContainer}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="m-4"></div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-black font-bold">
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
          <div className="flex justify-end ">
            <div onClick={handleForgetPassword} className="cursor-pointer">
              Quên mật khẩu
            </div>
          </div>
          <Button
            disabled={loadings}
            type="submit"
            className={styles.loginButton}
          >
            {loadings && <Loader2 className="animate-spin" />}
            Đăng Nhập
          </Button>
        </form>
      </Form>
      <div className={styles.registerPrompt}>
        <span>Chưa có tài khoản?</span>
        {path === "/login" ? (
          <Link prefetch href="/register" className={styles.registerLink}>
            Đăng ký ngay
          </Link>
        ) : (
          <div onClick={handleToRegister} className={styles.registerLink}>
            Đăng ký ngay
          </div>
        )}
      </div>

      <div className={styles.socialLoginSection}>
        <div className={styles.socialLoginTitleContainer}>
          <p className={styles.socialLoginTitle}>Đăng nhập bằng cách khác</p>
        </div>
        <SocialLoginButton
          provider="Google"
          icon="/login/google.png"
          message="Đăng nhập bằng"
        />
        {/* <SocialLoginButton
          provider="Facebook"
          icon="/login/facebook.png"
          message="Đăng nhập bằng"
        /> */}
      </div>
    </div>
  );
}
