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

const rewritePaths: Record<string, string> = {
  "/trang-chu": "/homepage",
  "/dang-nhap": "/login",
  "/dang-ky": "/register",
  "/kham-pha": "/searchpage",
  "/giam-gia":'/sales',
  "/gioi-thieu": "/about-us",
  '/lien-lac': "/contact",
};
const authPaths = ["/login", "/register", "/login-google"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  const rewriteTarget = Object.entries(rewritePaths).find(([key]) =>
    pathname.startsWith(key)
  )?.[1];
  if(pathname === "/"){
    return NextResponse.redirect(new URL("/trang-chu", request.url))
  }else if(pathname === "/customer"){
    return NextResponse.redirect(new URL("/customer/profile", request.url))
  }
  if (rewriteTarget) {
    return NextResponse.rewrite(new URL(rewriteTarget, request.url));
  }
  const productDetailMatch = pathname.match(/^\/chi-tiet-san-pham\/(.+)$/);
  if (productDetailMatch) {
    const id = productDetailMatch[1];
    return NextResponse.rewrite(new URL(`/product-detail/${id}`, request.url));
  }
  // Nếu chưa đăng nhập và truy cập trang yêu cầu quyền riêng tư → Redirect về /trang-chu
  if (
    privatePaths.some((path) => path.startsWith(pathname)) &&
    !accessToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/trang-chu", request.url));
  }
  //da dang nhap
  else if (authPaths.some((path) => path.startsWith(pathname)) && accessToken) {
    return NextResponse.redirect(new URL("/trang-chu", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sales',
    "/about-us",
    "/login-google",
    "/login",
    "/register",
    "/",
    '/customer',
    "/trang-chu",
    "/kham-pha",
    "/customer/profile",
    '/dang-nhap',
    '/dang-ky',
    '/giam-gia',
    "/contact",
    "/chi-tiet-san-pham/:id",
    '/lien-lac',
    "/gioi-thieu",
    "/customer/profile",
    "/customer/history",
    "/customer/order",
    "/product-detail/:id",
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
  ],
};
