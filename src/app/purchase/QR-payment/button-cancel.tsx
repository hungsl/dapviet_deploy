import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import styles from "./QrPayment.module.css";
import { usePopup } from "@/app/context/popup-provider";

export default function ButtonCancel() {
  const [open, setOpen, ] = useState(false);
   const { setContent } = usePopup();
  const handleClose = () => setOpen(false);
  
  const handleOpen = () => {
    setOpen(true); 
  };
  const handleBack = () => {
    setContent("payment");
  };

  return (
    <>
      <button className={styles.backButton} onClick={handleOpen} type="button">
        Hủy
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Không rời khỏi trang này khi đang thực hiện giao dịch</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Bạn có chắc muốn rời khỏi?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            không
          </Button>
          <Button onClick={handleBack} color="error">
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
