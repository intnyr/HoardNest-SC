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

const EditItemModal: React.FC<EditItemModalProps> = ({ open, onClose, item, onSave }) => {
    const [itemName, setItemName] = useState(item?.itemName || "");
    const [category, setCategory] = useState(item?.category || "");
    const [quality, setQuality] = useState(item?.quality || "");
    const [description, setDescription] = useState(item?.description || "");
    const [keywords, setKeywords] = useState(item?.keywords || "");
    const [price, setPrice] = useState(item?.price?.toString() || "");
    const [quantity, setQuantity] = useState(item?.quantity?.toString() || "1");
    const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
    const [prevImageUrl, setPrevImageUrl] = useState(item?.imageUrl || "");

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
        await fetch('/api/delete-cloudinary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
        });
    };

    const handleSave = async () => {
        // If image changed and there was a previous image, delete the old one
        if (prevImageUrl && imageUrl && prevImageUrl !== imageUrl) {
            await handleDeleteCloudinaryImage(prevImageUrl);
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
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <Box sx={{ width: '100%', aspectRatio: '1/1', borderRadius: 2, background: '#f5f5f5', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Thumbnail"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Typography variant="body2" color="text.secondary">No Image</Typography>
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
