import * as React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import EditItemModal from "../components/EditItemModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import RevenueBreakdown from "../components/RevenueBreakdown";

// Warranty display helper (matches EditItemModal logic)
function renderWarranty(warranty: Item["warranty"]) {
  if (!warranty || warranty === "") return null;
  if (warranty === "as-is") {
    return <span>Sold as-is, no warranty</span>;
  }
  if (typeof warranty === "object" && warranty.duration) {
    const isCustom = !["1 day", "3 days", "1 week", "1 month"].includes(
      warranty.duration
    );
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

interface Item {
  id: string;
  userId: string;
  imageUrl: string;
  itemName: string;
  category: string;
  quality: string;
  description: string;
  keywords: string;
  price: number;
  quantity: number;
  createdAt: any;
  warranty?: string | { duration?: string; exclusions?: string };
  availability?: string;
  sellerName?: string;
}

export default function Content() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Item | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Listen for auth state and set userId
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch only items for the current user
  useEffect(() => {
    if (!userId) {
      setItems([]);
      setFilteredItems([]);
      return;
    }
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allItems = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Item))
        .filter((item) => item.userId === userId);
      setItems(allItems);
      setFilteredItems(allItems);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredItems(items);
      return;
    }
    const lower = search.toLowerCase();
    setFilteredItems(
      items.filter(
        (item) =>
          item.itemName.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower) ||
          item.quality.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          item.keywords.toLowerCase().includes(lower)
      )
    );
  };

  const handleDelete = (item: Item) => {
    setDeleteItem(item);
    setDeleteOpen(true);
  };

  // Helper to extract public_id from Cloudinary URL
  function getCloudinaryPublicId(url: string): string | null {
    const match = url.match(/\/hoardnest-items\/([^\.\/]+)\.[a-zA-Z0-9]+$/);
    if (match) return `hoardnest-items/${match[1]}`;
    return null;
  }

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    // Delete image from Cloudinary if exists
    if (deleteItem.imageUrl) {
      const publicId = getCloudinaryPublicId(deleteItem.imageUrl);
      if (publicId) {
        await fetch("/api/delete-cloudinary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });
      }
    }
    await deleteDoc(doc(db, "items", deleteItem.id));
    setDeleteOpen(false);
    setDeleteItem(null);
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setEditOpen(true);
  };

  const handleEditSave = async (updated: Item) => {
    if (!updated.id) return;
    const ref = doc(db, "items", updated.id);
    await updateDoc(ref, {
      itemName: updated.itemName,
      category: updated.category,
      quality: updated.quality,
      description: updated.description,
      keywords: updated.keywords,
      price: updated.price,
      quantity: updated.quantity,
      imageUrl: updated.imageUrl,
      warranty: updated.warranty !== undefined ? updated.warranty : "",
      availability:
        updated.availability !== undefined ? updated.availability : "In stock",
      sellerName: updated.sellerName || "Unknown",
    });
    setEditOpen(false);
    setEditItem(null);
  };

  return (
    <>
      <EditItemModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        item={editItem}
        onSave={handleEditSave}
      />
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteItem?.itemName}
      />
      <Paper
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: "block" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Dig into your vault"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={handleSearch}
                >
                  Search Item
                </Button>
                <Tooltip title="Reload">
                  <IconButton
                    onClick={() => {
                      setSearch("");
                      setFilteredItems(items);
                    }}
                  >
                    <RefreshIcon color="inherit" sx={{ display: "block" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Product List
          </Typography>
          {filteredItems.length === 0 ? (
            <Typography
              align="center"
              sx={{ color: "text.secondary", my: 5, mx: 2 }}
            >
              Looks empty! Time to add your first listing.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        width: "100%",
                        aspectRatio: "1/1",
                        overflow: "hidden",
                        borderRadius: 2,
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.imageUrl || "/media/no-thumbnail.svg"}
                        alt={item.itemName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.itemName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {item.category} | {item.quality}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </Typography>

                    {/* Revenue breakdown for this item */}
                    <Box sx={{ mt: 1 }}>
                      <RevenueBreakdown orderValue={item.price} />
                    </Box>
                    <Typography variant="body2">
                      Quantity: <b>{item.quantity}</b>
                    </Typography>
                    <Typography variant="body2">
                      Availability: <b>{item.availability || "In stock"}</b>
                    </Typography>
                    {/* Warranty display */}
                    {item.warranty && item.warranty !== "" && (
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Warranty: {renderWarranty(item.warranty)}
                        </Typography>
                      </Box>
                    )}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </>
  );
}
