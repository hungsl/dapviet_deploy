import React from "react";
import CreateUser from "./create-user";

export default function pageCreate() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Tạo Người Dùng Mới
      </h1>
      <CreateUser />
    </div>
  );
}
