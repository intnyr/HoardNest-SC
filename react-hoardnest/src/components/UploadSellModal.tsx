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
import nothumbnail from "../media/no-thumbnail.svg";
import { Checkbox, FormControlLabel, Link } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, storage } from "../firebaseConfig";

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

  const handleUpload = async () => {
    if (!file || !itemName || !category || !quality || !description || !price || !agreed) {
      alert("Please fill in all required fields and agree to the terms.");
      return;
    }
    setUploading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `items/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save item details to Firestore
      await addDoc(collection(db, "items"), {
        userId: user.uid,
        itemName,
        category,
        quality,
        description,
        keywords,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        imageUrl: downloadURL,
        createdAt: Timestamp.now(),
      });

      // Reset form and close modal
      setFile(null);
      setItemName("");
      setCategory("");
      setQuality("");
      setDescription("");
      setKeywords("");
      setPrice("");
      setQuantity("1");
      setAgreed(false);
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const [quantity, setQuantity] = useState("1");
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #f5f5f5 0%, #e0e0e0 100%)',
          color: '#333',
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 1,
        }}
      >
        Submit Item Details
      </DialogTitle>
      <DialogContent>
        <Box my={2}>
          <Box
            maxWidth={600}
            mx="auto"
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 1,
              background: '#fafafa',
              mb: 2,
            }}
          >
            <Grid container spacing={1} alignItems="flex-start">
              {/* Left Column: Thumbnail */}
              <Grid item xs={8}>
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    pb: '100%', // 1:1 aspect ratio
                    borderRadius: 2,
                    background: '#f5f5f5',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Thumbnail"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '60%',
                        height: '60%',
                        opacity: 0.3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '20%',
                        left: '20%',
                      }}
                    >
                      <img
                        src={nothumbnail}
                        alt="No Thumbnail"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Right Column: Upload Button, Price, Quantity */}
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ py: 1, mb: 2, lineHeight: "normal" }}
                >
                  {file ? "Change File" : "Select File to Upload"}
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>

                {/* Quantity */}
                <TextField
                  label="Quantity"
                  type="number"
                  fullWidth
                  sx={{ mb: 1 }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  variant="outlined"
                  required
                  inputProps={{ min: 1, step: "1" }}
                />

                {/* Price */}
                <TextField
                  label="Price (PHP)"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  required
                  inputProps={{ min: 0, step: "0.01" }}
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Item Details Box */}
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 1,
              mt: 2,
              background: '#fafafa',
            }}
          >
            {/* Name of an item */}
            <TextField
              label="Name of Item"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              variant="outlined"
              required
            />
            {/* Item category or tags */}
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
            {/* Item quality */}
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

            {/* Item Description and Any Noted Defects */}
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

            {/* Additional metadata */}
            <TextField
              label="Keywords (comma separated)"
              fullWidth
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            p: 1,
            mt: 2,
            background: '#fafafa',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link href="/terms-and-conditions" target="_blank" rel="noopener">
                  Terms and Conditions
                </Link>
                .
              </Typography>
            }
          />
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
            !agreed ||
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