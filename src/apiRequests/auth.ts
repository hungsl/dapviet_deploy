import {  TransactionsResponse } from "@/app/purchase/QR-payment/QR-payment";
import http from "@/lib/http";
import {
  changePasswordBodyType,
  changePasswordResType,
  forgetPasswordResType,
  forgetPasswordType,
  LoginBodyType,
  LoginGoogleBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  resetPasswordBodyType,
  resetPasswordResType,
} from "@/schemaValidations/auth.schema";
import { CartResType } from "@/schemaValidations/cart";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  verifyEmail: (token: string) => http.get<CartResType>(`/users/auth/email/verify?token=${token}`),
  loginByGoogle: (body: LoginGoogleBodyType) =>
    http.post<LoginResType>("users/auth/login/google", body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("users/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/users/auth/register", body),
  auth: (body: { accessToken: string; refreshToken: string }) =>
    http.post("api/authen", body, { baseUrl: "" }),
  QRpayment: () =>
    http.get<TransactionsResponse>("api/QR-api",{ baseUrl: "" }),
  logoutFromNextServerToServer: (body: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  }) => http.post<MessageResType>("users/auth/logout", body),
  logoutFromNextClientToNextServer: (force?: boolean | undefined) =>
    http.post<MessageResType>(
      "api/authen/logout",
      {
        force,
      },
      {
        baseUrl: "",
      }
    ),
  forgetPassword: (body: forgetPasswordType) =>
    http.put<forgetPasswordResType>("users/auth/password/forgot", body),
  resetPassword: (body: resetPasswordBodyType) =>
    http.put<resetPasswordResType>("users/auth/password/reset", body),
  changePassword: (body: {
    value: changePasswordBodyType;
  }) =>
    http.put<changePasswordResType>("users/auth/password/change", body.value),
  refreshToken: (body: { auth: string }) =>
    http.post<LoginResType>("users/auth/access-token", body),
};

export default authApiRequest;
