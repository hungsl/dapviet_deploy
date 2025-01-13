import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Lấy cookie lưu `accessToken`
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("accessToken");

    if (!accessTokenCookie) {
      const now = new Date().toUTCString();
      return NextResponse.json({ expireAt: now });
    }
    // Tìm `Expires` trong cookie
    const accessTokenExpire = cookieStore.get("accessTokenExpires")?.value;
    if (!accessTokenExpire) {
      const now = new Date().toUTCString();
      return NextResponse.json({ expireAt: now });
    } else {
      const expireDate = new Date(Number(accessTokenExpire)).toUTCString();
      return NextResponse.json({ expireAt: expireDate });
    }
  } catch (error) {
    console.error("Error fetching expire date:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
