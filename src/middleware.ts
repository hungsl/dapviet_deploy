import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = [
  "/customer/profile",
  "/customer/history",
  "/customer/order",
  "/customer/payment",
  "/staff/dashboard",
  "/staff/manage-product",
  "/staff/manage-category",
  "/staff/manage-size",
  "/staff/manage-collection",
  "/staff/manage-order",
  "/staff/manage-revenue",
  "/staff/manage-user",
  "/staff/manage-payment",
];
const authPaths = ["/login", "/register", "/login-google"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  //chua dang nhap
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }
  if (
    privatePaths.some((path) => path.startsWith(pathname)) &&
    !accessToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }
  //da dang nhap
  else if (authPaths.some((path) => path.startsWith(pathname)) && accessToken) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login-google",
    "/login",
    "/register",
    "/",
    "/customer/profile",
    "/customer/history",
    "/customer/order",
    "/customer/payment",
  ],
};
