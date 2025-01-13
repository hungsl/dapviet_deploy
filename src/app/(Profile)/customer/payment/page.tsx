import React from "react";
import PaymentTable from "./payment-table";

export default function PaymentPage() {
  return (
    <>
      <div className="text-center my-4 mt-12 mb-10">
        <h1 className="text-2xl font-bold text-foreground">Danh sách các giao dịch của bạn</h1>
      </div>
      <PaymentTable />
    </>
  );
}
