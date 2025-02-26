'use client'
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginGoogle() {
  useEffect(() => {
    const handleGoogleSignIn = async () => {
      try {
        // console.log("kick hoat login")
        // Gọi signIn từ next-auth để đăng nhập với Google
        const result = await signIn("google", { redirect: false });

        if (result?.error) {
          // Xử lý lỗi đăng nhập nếu có
          console.error("Google login error", result.error);
        } else if (result?.ok) {
          // Đăng nhập thành công, bạn sẽ có session thông qua useSession
          // session.user sẽ có thông tin người dùng bao gồm email, name, image
          // console.log("thực thi api google login");
          // if (session?.user) {
          //   const { email, name, image } = session.user;
          //   console.log("set tên , email, ảnh vô api")
          //   console.log("lưu response vào cookie")
          //   // Cập nhật accessToken vào context (Giả sử accessToken có sẵn trong session hoặc result)
          //   console.log("User Info:", email, name, image); // Bạn có thể log hoặc xử lý dữ liệu người dùng ở đây
          // }
        }
      } catch (error) {
        console.error("Error during Google sign-in:", error);
      }
    };
    handleGoogleSignIn();
  }, []);
  return <div></div>;
}
