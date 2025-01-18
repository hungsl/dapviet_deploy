import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";
import { toast } from "@/hooks/use-toast";
import jwt from "jsonwebtoken";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field as "email" | "password", {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast({
      title: "error",
      description: error?.payload?.message ?? "Loi khong xac dinh",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};

export async function converBlobUrlToFile(blobUrl: string) {
  const Response = await fetch(blobUrl);
  const blob = await Response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
export function timeAgo(milliseconds: number) {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - milliseconds) / 1000);
  const units = [
    { name: "năm", seconds: 31536000 },
    { name: "tháng", seconds: 2592000 },
    { name: "ngày", seconds: 86400 },
    { name: "giờ", seconds: 3600 },
    { name: "phút", seconds: 60 },
    { name: "giây", seconds: 1 },
  ];
  for (const unit of units) {
    const count = Math.floor(diffInSeconds / unit.seconds);
    if (count >= 1) {
      return `${count} ${unit.name}${count > 1 ? "s" : ""} trước`;
    }
  }
  return "hiện tại";
}

export function formatCurrency(number: number | undefined) {
  if(!number) return
  return `đ ${number.toLocaleString('vi-VN')}`;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
export const truncateText = (text: string, wordLimit: number) => {
  if (!text) return "Không có mô tả";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
