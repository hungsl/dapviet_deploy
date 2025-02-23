import React from "react";
import { SocialLoginButtonProps } from "./types";
import styles from "@/app/(authen)/authen-style.module.css";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  icon,
  message,
}) => {
  // const handleGoogleSignIn = async () => {
  //   try {
  //     // Gọi signIn từ next-auth để đăng nhập với Google
  //     const result = await signIn("google", { redirect: false });

  //     if (result?.error) {
  //       // Xử lý lỗi đăng nhập nếu có
  //       console.error("Google login error", result.error);
  //     } else if (result?.ok) {
  //       // Đăng nhập thành công, bạn sẽ có session thông qua useSession
  //       // session.user sẽ có thông tin người dùng bao gồm email, name, image
  //       console.log("thực thi api google login")
  //       // if (session?.user) {
  //       //   const { email, name, image } = session.user;
  //       //   console.log("set tên , email, ảnh vô api")
  //       //   console.log("lưu response vào cookie")
  //       //   // Cập nhật accessToken vào context (Giả sử accessToken có sẵn trong session hoặc result)
  //       //   console.log("User Info:", email, name, image); // Bạn có thể log hoặc xử lý dữ liệu người dùng ở đây
  //       // }
  //     }
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error);
  //   }
  // };
  return (
    <>
      {/* <button onClick={handleGoogleSignIn} className={styles.socialLoginButton}>
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 aspect-square w-[30px]"
        />
        <div className="my-auto">
          {message} <span className="font-bold">{provider}</span>
        </div>
      </button> */}
      <Link href="/login-google" className={`${styles.socialLoginButton} hover:bg-accent`}>
        <Image
          width={300}
          height={300}
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 aspect-square w-[30px]"
        />
        <div className="my-auto">
          {message} <span className="font-bold text-foreground ">{provider}</span>
        </div>
      </Link>
      {/* <Button onClick={() => signOut()}>sigout</Button> */}
    </>
  );
};
