"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ButtonTest from "@/app/testAdministrationProgram/buttonTest";

export default function ManageBotChat() {
  const [productId, setProductId] = useState<string>("");
  const [deleteProductId, setDeleteProductId] = useState<string>("");
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-10">
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-lg w-[40%]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔥 Hãy nhập <span className="text-blue-600">Product ID</span> để cập
            nhật sản phẩm mới cho Chat AI!
          </h2>
          <Input
            type="text"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            placeholder="Nhập productId..."
            className="w-full p-3 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <ButtonTest text="Cập nhật sản phẩm" productId={productId} />
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-lg w-[40%]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔥 Hãy nhập <span className="text-blue-600">Product ID</span> để xóa
            sản phẩm cho Chat AI!
          </h2>
          <Input
            type="text"
            onChange={(e) => setDeleteProductId(e.target.value)}
            value={deleteProductId}
            placeholder="Nhập productId..."
            className="w-full p-3 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <ButtonTest text="Xóa sản phẩm" className ="!bg-red-400" productId={deleteProductId} />
        </div>
      </div>
    </>
  );
}
