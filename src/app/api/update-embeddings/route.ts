import { pineconeIndex } from "@/lib/pinecone";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    // const { productId } = await req.json();
    console.log(req)
    // Lấy sản phẩm từ database
    const res = await fetch("http://localhost:3000/api/products");
    const response = res.ok ? await res.json() : null;
    const products = response?.payload?.data;

    if (!products) {
      return new Response(JSON.stringify({ error: "Sản phẩm không tồn tại" }), {
        status: 404,
      });
    }
    for (const product of products) {
      // Tạo embeddings từ mô tả sản phẩm
      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-ada-002", // Model OpenAI để tạo embeddings
        input: `${product.name}  ${product.description} ${product.description}`, // Chuyển tên + mô tả sản phẩm thành vector // cần description để tìm kiếm
      });

      const vector = embeddingRes.data[0].embedding; // Lấy vector embeddings từ API OpenAI

      // console.log(vector);
      // Lưu embeddings vào Pinecone
      // Lưu embeddings vào Pinecone
      await pineconeIndex.upsert([
        {
          id: product.id, // ID sản phẩm để dễ dàng truy vấn lại
          values: vector, // Vector embeddings đã tạo
          metadata: {
            name: product.name, // Lưu metadata để hiển thị khi tìm kiếm
            price: product.unitPrice,//không cần description vì bên chat không lấy
            link: `https://www.dapviet.shop/product-detail/${product.id}`,
          },
        },
      ]);
    }

    return new Response(
      JSON.stringify({ message: "Cập nhật embeddings thành công" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi cập nhật embeddings:", error);
    return new Response(JSON.stringify({ error: "Lỗi server" }), {
      status: 500,
    });
  }
}
