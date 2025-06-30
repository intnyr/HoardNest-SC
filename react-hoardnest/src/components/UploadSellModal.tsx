import React, { useState } from "react";
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
  Grid,
} from "@mui/material";

interface UploadSellModalProps {
  open: boolean;
  onClose: () => void;
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

const UploadSellModal: React.FC<UploadSellModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [price, setPrice] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setFile(null);
      setItemName("");
      setCategory("");
      setQuality("");
      setDescription("");
      setKeywords("");
      setPrice("");
      onClose();
      // You can add your upload logic here
    }, 1500);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit Item Details</DialogTitle>
      <DialogContent>
        <Box my={2}>
          <Grid container spacing={2} alignItems="center">
            {/* Left Column: Thumbnail */}
            <Grid item xs={8}>
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Thumbnail"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              )}
            </Grid>

            {/* Right Column: Upload Button */}
            <Grid item xs={4}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                {file ? "Change File" : "Select File to Upload"}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>
              {file && (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Selected: {file.name}
                </Typography>
              )}

              {/* 6. Price */}
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                required
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
          </Grid>

          {/* Item Details Box */}
          <Box display="flex" flexDirection="column" gap={2}>
            {/* 1. Name of an item */}
            <TextField
              label="Name of Item"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              variant="outlined"
              required
            />

            {/* 2. Item category or tags */}
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

            {/* 3. Item quality */}
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

            {/* 4. Item Description and Any Noted Defects */}
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

            {/* 5. Additional metadata */}
            <TextField
              label="Keywords (comma separated)"
              fullWidth
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              variant="outlined"
            />

          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          variant="contained"
          disabled={
            !file ||
            !itemName ||
            !category ||
            !quality ||
            !description ||
            !price ||
            uploading
          }
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadSellModal;