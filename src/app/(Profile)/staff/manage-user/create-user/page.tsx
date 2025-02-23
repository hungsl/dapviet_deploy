import React from "react";
import CreateUser from "./create-user";
import Link from "next/link";

export default function pageCreate() {
  return (
    <div>
       <Link
        href={"/staff/manage-user"}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Trở lại danh sách</span>
      </Link>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
        className="text-foreground"
      >
        Tạo Người Dùng Mới
      </h1>
      <CreateUser />
    </div>
  );
}
