"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import styles from "../manage-product/Product.module.css";
import { toast } from "@/hooks/use-toast";
import orderApiRequest from "@/apiRequests/order";

export default function ButtonCancel({
  orderId,
}: {
  orderId: string;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancal = async () => {
    try {
      const result = await orderApiRequest.staffOrderCancel(orderId);
      toast({
        description: result.payload.message,
        duration: 2000,
      });
    } catch (error) {
      console.log("lỗi khi hủy đơn hàng: ", error);
      toast({
        variant: "destructive",
        title: "Không thể hủy",
        description: "Đơn hàng đã rời kho"
      })
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => handleOpen()}
        className={`${styles.deleteBtn}`}
      >
        Hủy đơn
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Xác nhận hủy đơn hàng
          <div>{orderId}</div>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Bạn có chắc chắn muốn hủy đơn hàng này?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không
          </Button>
          <Button onClick={handleCancal} color="error">
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
