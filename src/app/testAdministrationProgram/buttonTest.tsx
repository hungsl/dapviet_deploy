"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import websiteSections from "@/lib/data";
import React from "react";
// Các phần nội dung cần lưu riêng biệt

export default function ButtonTest({
  text,
  productId,
}: {
  text: string;
  productId: string;
}) {
  const handleTest = async (text: string, productId: string) => {
    if (productId) {
      try {
        const res = await fetch("/api/update-embeddings-P-id", {
          method: "POST",
          body: JSON.stringify(productId),
          headers: { "Content-Type": "application/json" },
        });
        const response = res.ok ? await res.json() : null;
        console.log(response);
        toast({
          variant: response === null ? "destructive" : "default",
          title: response === null ? "Không Tìm thấy sản phẩm" : response.message,
          duration: 4000
        });
      } catch (error) {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Không Tìm thấy sản phẩm",
        });
      }
    }
    if (text === "addall") {
      // cap nhat tat ca san pham
      const res = await fetch("/api/update-embeddings", {
        method: "POST",
        body: JSON.stringify("123"),
        headers: { "Content-Type": "application/json" },
      });
      const response = res.ok ? await res.json() : null;
      
      console.log(response);
    } else if (text === "content") {
      //cap nhat noi dung website
      // cap nhat tat ca san pham
      const res = await fetch("/api/update-embeddings-web", {
        method: "POST",
        body: JSON.stringify(websiteSections),
        headers: { "Content-Type": "application/json" },
      });
      const response = res.ok ? await res.json() : null;
      console.log(response);
    }
  };
  return (
    <Button
      disabled={productId == ""}
      className="mt-4 px-6 py-3 text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
      onClick={() => handleTest(text, productId)}
    >
      {text}
    </Button>
  );
}
