import productApiRequest from "@/apiRequests/product";
import { pineconeIndex } from "@/lib/pinecone";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const productId = await req.json();

    // Lấy sản phẩm từ database
    const res = await productApiRequest.product(productId);

    const product = res?.payload?.data;

    if (!product) {
      return new Response(JSON.stringify({ error: "Sản phẩm không tồn tại" }), {
        status: 404,
      });
    }
    // console.log(product);
    // Tạo embeddings từ mô tả sản phẩm
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: `${product.name} ${product.description} ${product.unitPrice}`,
    });

    const vector = embeddingRes.data[0].embedding;

    // Lưu embeddings vào Pinecone
    await pineconeIndex.upsert([
      {
        id: product.id,
        values: vector,
        metadata: {
          name: product.name,
          description:product.description,
          price: product.unitPrice,
          link: `https://www.dapviet.shop/product-detail/${product.id}`,
        },
      },
    ]);

    return new Response(
      JSON.stringify({
        message: `Cập nhật embeddings cho sản phẩm ${product.name} thành công`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi cập nhật embeddings:", error);
    return new Response(JSON.stringify({ error: "Lỗi server" }), {
      status: 500,
    });
  }
}
