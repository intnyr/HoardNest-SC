import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface EditItemModalProps {
  open: boolean;
  onClose: () => void;
  item: any;
  onSave: (updated: any) => void;
}

const categories = [
  "Furniture & Home Décor",
  "Kitchen & Dining",
  "Electronics & Gadgets",
  "Clothing & Accessories",
  "Books & Stationery",
  "Toys & Games",
  "Sporting Goods",
  "Baby & Kids",
  "Gardening & Outdoor",
  "Tools & Home Improvement",
  "Health & Personal Care",
  "Art & Collectibles",
  "Pet Supplies",
  "Hobby & DIY Supplies",
  "Seasonal Items",
  "Miscellaneous",
];

const qualities = [
  "New (never used)",
  "Like new (minimal wear and tear)",
  "Good condition (some wear and tear)",
  "Fair condition (noticeable wear and tear)",
  "Poor condition (heavily used or damaged)",
];

declare global {
  interface Window {
    cloudinary: any;
  }
}

// Helper to extract public_id from Cloudinary URL
function getCloudinaryPublicId(url: string): string | null {
  // Example: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/hoardnest-items/filename.jpg
  const match = url.match(/\/hoardnest-items\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
  if (match) return `hoardnest-items/${match[1]}`;
  return null;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  open,
  onClose,
  item,
  onSave,
}) => {
  const [itemName, setItemName] = useState(item?.itemName || "");
  const [category, setCategory] = useState(item?.category || "");
  const [quality, setQuality] = useState(item?.quality || "");
  const [description, setDescription] = useState(item?.description || "");
  const [keywords, setKeywords] = useState(item?.keywords || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [quantity, setQuantity] = useState(item?.quantity?.toString() || "1");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
  const [prevImageUrl, setPrevImageUrl] = useState(item?.imageUrl || "");
  const [availability, setAvailability] = useState(
    item?.availability || "In stock"
  );
  // Warranty state
  const [warrantyOption, setWarrantyOption] = useState(
    item?.warranty && item?.warranty !== "as-is" && item?.warranty !== ""
      ? "warranty"
      : item?.warranty === "as-is"
      ? "as-is"
      : ""
  );
  const [warrantyDuration, setWarrantyDuration] = useState(
    item?.warranty &&
      typeof item.warranty === "object" &&
      item.warranty.duration
      ? item.warranty.duration
      : ""
  );
  const [customWarrantyDuration, setCustomWarrantyDuration] = useState(
    item?.warranty &&
      typeof item.warranty === "object" &&
      item.warranty.duration &&
      !["1 day", "3 days", "1 week", "1 month"].includes(item.warranty.duration)
      ? item.warranty.duration
      : ""
  );
  const [warrantyExclusions, setWarrantyExclusions] = useState(
    item?.warranty &&
      typeof item.warranty === "object" &&
      item.warranty.exclusions
      ? item.warranty.exclusions
      : ""
  );

  useEffect(() => {
    setItemName(item?.itemName || "");
    setCategory(item?.category || "");
    setQuality(item?.quality || "");
    setDescription(item?.description || "");
    setKeywords(item?.keywords || "");
    setPrice(item?.price?.toString() || "");
    setQuantity(item?.quantity?.toString() || "1");
    setImageUrl(item?.imageUrl || "");
    setPrevImageUrl(item?.imageUrl || "");
    setAvailability(item?.availability || "In stock");
    // Warranty
    setWarrantyOption(
      item?.warranty && item?.warranty !== "as-is" && item?.warranty !== ""
        ? "warranty"
        : item?.warranty === "as-is"
        ? "as-is"
        : ""
    );
    setWarrantyDuration(
      item?.warranty &&
        typeof item.warranty === "object" &&
        item.warranty.duration
        ? item.warranty.duration
        : ""
    );
    setCustomWarrantyDuration(
      item?.warranty &&
        typeof item.warranty === "object" &&
        item.warranty.duration &&
        !["1 day", "3 days", "1 week", "1 month"].includes(
          item.warranty.duration
        )
        ? item.warranty.duration
        : ""
    );
    setWarrantyExclusions(
      item?.warranty &&
        typeof item.warranty === "object" &&
        item.warranty.exclusions
        ? item.warranty.exclusions
        : ""
    );
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [item, open]);

  const openCloudinaryWidget = (cb: (url: string) => void) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "ddkqni3iw",
        uploadPreset: "hoardnest_unsigned",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: false,
        folder: "hoardnest-items",
        resourceType: "image",
        maxFileSize: 1000000,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          cb(result.info.secure_url);
        }
      }
    );
  };

  const handleDeleteCloudinaryImage = async (url: string) => {
    const publicId = getCloudinaryPublicId(url);
    if (!publicId) return;
    // Call your backend API to delete the image from Cloudinary
    // Example fetch:
    await fetch("/api/delete-cloudinary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  };

  const handleSave = async () => {
    // If image changed and there was a previous image, delete the old one
    if (prevImageUrl && imageUrl && prevImageUrl !== imageUrl) {
      await handleDeleteCloudinaryImage(prevImageUrl);
    }
    // Warranty validation: if warranty is selected, duration is required
    if (
      warrantyOption === "warranty" &&
      !(warrantyDuration || customWarrantyDuration)
    ) {
      alert("Please specify the warranty duration.");
      return;
    }
    onSave({
      ...item,
      itemName,
      category,
      quality,
      description,
      keywords,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      imageUrl,
      availability,
      warranty:
        warrantyOption === "warranty"
          ? {
              duration:
                warrantyDuration === "custom"
                  ? customWarrantyDuration
                  : warrantyDuration,
              exclusions: warrantyExclusions,
            }
          : warrantyOption === "as-is"
          ? "as-is"
          : "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: 2,
              background: "#f5f5f5",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Thumbnail"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No Image
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 1, mb: 2, lineHeight: "normal" }}
            onClick={() => openCloudinaryWidget((url) => setImageUrl(url))}
          >
            {imageUrl ? "Change Image" : "Upload Image"}
          </Button>
          <TextField
            label="Name of Item"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            variant="outlined"
            required
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="quality-label">Item Quality</InputLabel>
            <Select
              labelId="quality-label"
              value={quality}
              label="Item Quality"
              onChange={(e) => setQuality(e.target.value)}
              required
            >
              {qualities.map((q) => (
                <MenuItem key={q} value={q}>
                  {q}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Item Description and Any Noted Defects"
            multiline
            minRows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            required
          />

          {/* Warranty Section */}
          <Box
            sx={{
              mb: 1,
              p: 1,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              background: "#f5f5f5",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Warranty
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={warrantyOption === "warranty"}
                  onChange={() =>
                    setWarrantyOption(
                      warrantyOption === "warranty" ? "" : "warranty"
                    )
                  }
                  color="primary"
                />
              }
              label="This item includes a warranty"
            />
            {warrantyOption === "warranty" && (
              <Box sx={{ ml: 3, mb: 1 }}>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel id="warranty-duration-label">
                    Warranty Duration
                  </InputLabel>
                  <Select
                    labelId="warranty-duration-label"
                    value={warrantyDuration}
                    label="Warranty Duration"
                    onChange={(e) => setWarrantyDuration(e.target.value)}
                  >
                    <MenuItem value="1 day">1 day</MenuItem>
                    <MenuItem value="3 days">3 days</MenuItem>
                    <MenuItem value="1 week">1 week</MenuItem>
                    <MenuItem value="1 month">1 month</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
                {warrantyDuration === "custom" && (
                  <TextField
                    label="Custom Duration"
                    fullWidth
                    value={customWarrantyDuration}
                    onChange={(e) => setCustomWarrantyDuration(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                )}
                <TextField
                  label="Exclusions (e.g. accidental damage, misuse, normal wear and tear)"
                  fullWidth
                  value={warrantyExclusions}
                  onChange={(e) => setWarrantyExclusions(e.target.value)}
                  variant="outlined"
                />
              </Box>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={warrantyOption === "as-is"}
                  onChange={() =>
                    setWarrantyOption(warrantyOption === "as-is" ? "" : "as-is")
                  }
                  color="primary"
                />
              }
              label="This item is sold as-is with no warranty"
            />
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="availability-label">Availability</InputLabel>
            <Select
              labelId="availability-label"
              value={availability}
              label="Availability"
              onChange={(e) => setAvailability(e.target.value)}
              required
            >
              <MenuItem value="In stock">In stock</MenuItem>
              <MenuItem value="Out of stock">Out of stock</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Keywords (comma separated)"
            fullWidth
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Price (PHP)"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
            required
            inputProps={{ min: 0, step: "0.01" }}
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            variant="outlined"
            required
            inputProps={{ min: 1, step: "1" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemModal;
