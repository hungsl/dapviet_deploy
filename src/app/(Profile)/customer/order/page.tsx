import React from "react";
import OrderTable from "./order-table";

export default function OrderPage() {
  return (
    <>
      <div className="text-center my-4 mt-12 mb-10">
        <h1 className="text-2xl font-bold text-foreground">Danh sách các đơn hàng của bạn</h1>
      </div>
      <OrderTable />
    </>
  );
}
