import productApiRequest from "@/apiRequests/product";

export async function fetchProductsFromDB() {
  try {
    const products = await productApiRequest.productsOpenAI();
    return products;
  } catch (error) {
    console.error("Lỗi query database:", error);
    throw error;
  }
}
