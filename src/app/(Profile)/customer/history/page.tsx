import React from "react";
import PurchaseHistoryTable from "./purchase-history";

export default function Historypage() {
  return (
    <>
      <div className="text-center my-4 mt-12 text-foreground  ">
        <h1 className="text-2xl font-bold">Lịch Sử Mua Hàng</h1>
        <p className="text-gray-600 mt-2">
          Dưới đây là thông tin các đơn hàng bạn đã thực hiện trên website của
          chúng tôi.
        </p>
      </div>
      <PurchaseHistoryTable />
    </>
  );
}
