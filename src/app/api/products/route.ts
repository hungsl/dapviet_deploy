import { NextResponse } from "next/server";
import { fetchProductsFromDB } from "@/lib/fetchProducts"; // Hàm lấy sản phẩm từ DB

export async function GET() {
  try {
    const products = await fetchProductsFromDB();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return new NextResponse("Lỗi server", { status: 500 });
  }
}
