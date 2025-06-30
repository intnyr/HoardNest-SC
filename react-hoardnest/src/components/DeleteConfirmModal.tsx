import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress, Box } from "@mui/material";

interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    loading?: boolean; // Add loading prop
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ open, onClose, onConfirm, itemName, loading }) => (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
            <Typography>
                Are you sure you want to delete <b>{itemName || 'this item'}</b>? This action cannot be undone.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary" disabled={loading}>
                Cancel
            </Button>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
                    Delete
                </Button>
                {loading && (
                    <CircularProgress size={24} sx={{
                        color: 'error.main',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }} />
                )}
            </Box>
        </DialogActions>
    </Dialog>
);

export default DeleteConfirmModal;
