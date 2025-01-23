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
import { useLoading } from "@/app/context/loading-provider";

export default function ButtonDelete({
  collectionId,
  isDelete,
  deleted,
  setDeleted,
}: {
  collectionId: string;
  isDelete: boolean;
  deleted: boolean;
  setDeleted: (deleted: boolean) => void
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const {setLoading} = useLoading()
  const handleOpen = () => {
    setOpen(true); // Mở Dialog
  };

  const handleDelete = async () => {
    try {
      setLoading(true)
      const result = await typesApiRequest.deleteCollection(collectionId);
      toast({
        description: result.payload.message,
        duration: 2000,
      });
    } catch (error) {
      console.log("lỗi khi xóa doanh mục: ", error);
    } finally {
      setLoading(false)
      setDeleted(!deleted)
      setOpen(false);
    }
  };
  const handleActive = async () => {
    try {
      setLoading(true)
      const result = await typesApiRequest.activeCollection(collectionId);
      toast({
        description: result.payload.message,
        duration: 2000,
      });
    } catch (error) {
      console.log("lỗi khi Kích hoạt kích thước: ", error);
    } finally {
      setOpen(false);
      setDeleted(!deleted)
      setLoading(false)
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
