import React, { useContext } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { ShopContext } from "../context/ShopContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ProductQuickViewModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    item: {
      id: string;
      image: string;
      name: string;
      price: number;
      category?: string;
      quality?: string;
      description?: string;
      warranty?: string | { duration?: string; exclusions?: string };
      availability?: string;
      quantity?: number;
      keywords?: string;
      sellerName?: string;
    };
  } | null;
}

type WarrantyType =
  | string
  | { duration?: string; exclusions?: string }
  | undefined;
function renderWarranty(warranty: WarrantyType) {
  if (!warranty || warranty === "") return null;
  if (warranty === "as-is") {
    return <span>Sold as-is, no warranty</span>;
  }
  if (typeof warranty === "object" && warranty.duration) {
    return (
      <>
        <span>{warranty.duration}</span>
        {warranty.exclusions && warranty.exclusions.trim() !== "" && (
          <>
            <br />
            <span style={{ color: "#b71c1c" }}>
              Exclusions: {warranty.exclusions}
            </span>
          </>
        )}
      </>
    );
  }
  return null;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const { fullName } = useCurrentUser();
  const shopContext = useContext(ShopContext);
  // Defensive: check product and product.item
  if (!product || !product.item || !shopContext) return null;
  const { nest, addToNest } = shopContext;
  const { item } = product;
  // Use only item.id for isInNest (string type)
  const isInNest = nest.some((n) => n.id === item.id);
  const handleAddToNest = () => {
    if (!isInNest) {
      addToNest(item);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{item.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                background: "#f5f5f5",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={item.image || "/media/no-thumbnail.svg"}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              ₱{item.price}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Seller: <b>{fullName || "Unknown"}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {item.category} | {item.quality}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {item.description}
            </Typography>
            {/* Availability removed as requested */}
            <Typography variant="body2" sx={{ mb: 1 }}>
              Quantity: <b>{item.quantity}</b>
            </Typography>
            {item.warranty && item.warranty !== "" && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Warranty: {renderWarranty(item.warranty)}
                </Typography>
              </Box>
            )}

            {item.keywords && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 2, display: "block" }}
              >
                Keywords: {item.keywords}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", pr: 2, pb: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            /* TODO: Implement review and buy logic */
          }}
        >
          Review and Buy
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleAddToNest}
          disabled={isInNest}
        >
          {isInNest ? "Added to Nest" : "Add to My Nest"}
        </Button>
      </DialogActions>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};

export default ProductQuickViewModal;
