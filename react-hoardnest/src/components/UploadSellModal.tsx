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
  Grid,
} from "@mui/material";
import nothumbnail from "../media/no-thumbnail.svg";
import { Checkbox, FormControlLabel, Link } from "@mui/material";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import CloseIcon from "@mui/icons-material/Close";

declare global {
  interface Window {
    cloudinary: any;
  }
}

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
  const [imageUrl, setImageUrl] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [price, setPrice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [agreed, setAgreed] = useState(false);
  // Warranty state
  const [warrantyOption, setWarrantyOption] = useState(""); // 'warranty' or 'as-is' or ''
  const [warrantyDuration, setWarrantyDuration] = useState("");
  const [customWarrantyDuration, setCustomWarrantyDuration] = useState("");
  const [warrantyExclusions, setWarrantyExclusions] = useState("");

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCloudinaryWidget = (cb: (url: string) => void) => {
    // @ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: "ddkqni3iw", // replace with your Cloudinary cloud name
        uploadPreset: "hoardnest_unsigned", // set up an unsigned upload preset in Cloudinary settings
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

  const handleUpload = async () => {
    if (
      !imageUrl ||
      !itemName ||
      !category ||
      !quality ||
      !description ||
      !price ||
      !agreed
    ) {
      alert("Please fill in all required fields and agree to the terms.");
      return;
    }
    // Warranty validation: if warranty is selected, duration is required
    if (
      warrantyOption === "warranty" &&
      !(warrantyDuration || customWarrantyDuration)
    ) {
      alert("Please specify the warranty duration.");
      return;
    }
    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      await addDoc(collection(db, "items"), {
        userId: user.uid,
        itemName,
        category,
        quality,
        description,
        keywords,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        imageUrl,
        createdAt: Timestamp.now(),
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
      setImageUrl("");
      setItemName("");
      setCategory("");
      setQuality("");
      setDescription("");
      setKeywords("");
      setPrice("");
      setQuantity("1");
      setAgreed(false);
      setWarrantyOption("");
      setWarrantyDuration("");
      setCustomWarrantyDuration("");
      setWarrantyExclusions("");
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #f5f5f5 0%, #e0e0e0 100%)",
          color: "#333",
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 1,
          pr: 5,
        }}
      >
        Submit Item Details
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            minWidth: 0,
            p: 1,
            color: "#555",
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box my={2}>
          <Box
            maxWidth={600}
            mx="auto"
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 1,
              background: "#fafafa",
              mb: 2,
            }}
          >
            <Grid container spacing={1} alignItems="flex-start">
              {/* Left Column: Thumbnail */}
              <Grid item xs={8}>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    pb: "100%", // 1:1 aspect ratio
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
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "60%",
                        height: "60%",
                        opacity: 0.3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: "20%",
                        left: "20%",
                      }}
                    >
                      <img
                        src={nothumbnail}
                        alt="No Thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
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
                  fullWidth
                  sx={{ py: 1, mb: 2, lineHeight: "normal" }}
                  onClick={() =>
                    openCloudinaryWidget((url) => setImageUrl(url))
                  }
                >
                  {imageUrl ? "Change Image" : "Upload Image"}
                </Button>
                {imageUrl && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Uploaded!
                  </Typography>
                )}

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
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 1,
              mt: 2,
              background: "#fafafa",
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
              sx={{ mb: 1 }}
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
                sx={{ mb: 1 }}
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
                sx={{ mb: 1 }}
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
              sx={{ mb: 1 }}
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
                      onChange={(e) =>
                        setCustomWarrantyDuration(e.target.value)
                      }
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
                      setWarrantyOption(
                        warrantyOption === "as-is" ? "" : "as-is"
                      )
                    }
                    color="primary"
                  />
                }
                label="This item is sold as-is with no warranty"
              />
            </Box>

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
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 1,
            mt: 2,
            background: "#fafafa",
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
                <Link
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener"
                >
                  Terms and Conditions
                </Link>
                .
              </Typography>
            }
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        <Button onClick={onClose} color="secondary" disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          variant="contained"
          disabled={
            !imageUrl ||
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
