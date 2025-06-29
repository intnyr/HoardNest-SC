import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface UploadSellModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadSellModal: React.FC<UploadSellModalProps> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Submit Item Details</DialogTitle>
    <DialogContent>
      {/* Place your upload form or content here */}
      <p>Here you can upload your item for sale.</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Close</Button>
      {/* Add more actions as needed */}
    </DialogActions>
  </Dialog>
);

export default UploadSellModal;