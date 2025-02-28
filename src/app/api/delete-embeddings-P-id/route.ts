import { pineconeIndex } from "@/lib/pinecone";


export async function DELETE(req: Request) {
  try {
    const productId = await req.json();

    if (!productId) {
      return new Response(JSON.stringify({ error: "Thiếu productId" }), {
        status: 400,
      });
    }
    // Xóa sản phẩm khỏi Pinecone
    await pineconeIndex.deleteOne(productId);

    return new Response(
      JSON.stringify({
        message: `Xóa embeddings của sản phẩm ${productId} thành công!`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi xóa embeddings:", error);
    return new Response(JSON.stringify({ error: "Lỗi server" }), {
      status: 500,
    });
  }
}
