import React from "react";
import PaymentTable from "./payment-table";

export default function PaymentPage() {
  return (
    <>
      <div className="text-center mt-12 mb-2">
        <h1 className="text-2xl font-bold text-foreground">Danh sách các giao dịch của bạn</h1>
      </div>
      <PaymentTable />
    </>
  );
}
