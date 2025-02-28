import { Pinecone } from "@pinecone-database/pinecone";

// Khởi tạo kết nối với Pinecone, sử dụng API Key và môi trường từ biến môi trường
export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!, // API Key để xác thực với Pinecone
});

// Truy cập index "dapviet-products", nơi lưu trữ embeddings của sản phẩm
export const pineconeIndex = pinecone.Index("dapviet-products");
