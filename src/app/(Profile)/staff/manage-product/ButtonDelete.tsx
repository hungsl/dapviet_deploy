"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import styles from "./Product.module.css";
import { toast } from "@/hooks/use-toast";
import productApiRequest from "@/apiRequests/product";
import { useRouter } from "next/navigation";

export default function ButtonDelete({
  productId,
  // isDelete
}: {
  productId: string;
  // isDelete: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const handleOpen = () => {
    setOpen(true); // Mở Dialog
  };
  const handleDelete = async () => {
    try {
      const result = await productApiRequest.deleteProductStaff(
        productId,
      );
      toast({
        description: result.payload.message,
        duration: 2000,
      });
    } catch (error) {
      console.log("fail to delete product: ", error);
    } finally {
      setOpen(false);
      router.refresh();
    }
  };
  // const handleActive = async () => {
  //   try {
  //     const result = await productApiRequest.activeProductStaff(productId, accessToken);
  //     toast({
  //       description: result.payload.message,
  //       duration: 2000,
  //     });
  //   } catch (error) {
  //     console.log("lỗi khi Kích hoạt kích thước: ", error);
  //   } finally {
  //     setOpen(false);
  //     router.refresh();
  //   }
  // }
  return (
    <>
    
        <button
          onClick={() => handleOpen()}
          className={`${styles.deleteBtn} `}
        >
          Xóa
        </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa {productId}</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Bạn có chắc chắn muốn xóa sản phẩm này?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
