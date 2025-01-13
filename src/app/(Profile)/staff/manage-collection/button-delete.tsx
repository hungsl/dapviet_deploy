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
import typesApiRequest from "@/apiRequests/type";
import { useRouter } from "next/navigation";

export default function ButtonDelete({
  collectionId,
  accessToken,
  isDelete,
}: {
  collectionId: string;
  accessToken: string;
  isDelete: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const router = useRouter()
  const handleOpen = () => {
    setOpen(true); // Mở Dialog
  };

  const handleDelete = async () => {
    try {
      const result = await typesApiRequest.deleteCollection(collectionId, accessToken);
      toast({
        description: result.payload.message,
        duration: 2000,
      });
    } catch (error) {
      console.log("lỗi khi xóa doanh mục: ", error);
    } finally {
      router.refresh();
      setOpen(false);
    }
  };
  const handleActive = async () => {
    try {
      const result = await typesApiRequest.activeCollection(collectionId, accessToken);
      toast({
        description: result.payload.message,
        duration: 2000,
      });
      router.refresh();
    } catch (error) {
      console.log("lỗi khi Kích hoạt kích thước: ", error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      {isDelete ? (
        <button onClick={() => handleActive()} className={styles.activateBtn}>
          Kích hoạt
        </button>
      ) : (
        <button
          disabled={isDelete}
          onClick={() => handleOpen()}
          className={`${styles.deleteBtn} ${isDelete && "disabled"}`}
        >
          Xóa
        </button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Xác nhận xóa bộ sưu tập
          <div>{collectionId}</div>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Bạn có chắc chắn muốn xóa bộ sưu tập này?
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
