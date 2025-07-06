import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  CircularProgress,
} from "@mui/material";
import { ShopContext } from "../context/ShopContext";
import CategoryTitle from "./CategoryTitle";
import ProductItem from "./ProductItem";
import ProductQuickViewModal from "./ProductQuickViewModal";

interface NewListingProps {
  selectedCategory: string;
  searchValue?: string;
}

const NewListing: React.FC<NewListingProps> = ({
  selectedCategory,
  searchValue = "",
}) => {
  const shopContext = useContext(ShopContext);
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

  if (!shopContext) {
    return <div>Error: ShopContext is not available.</div>;
  }

  const { products, loading } = shopContext;

  // Filter new listings (created in the last 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  let newListings = products.filter(
    (product) =>
      product.createdAt &&
      product.createdAt.toDate &&
      product.createdAt.toDate() >= sevenDaysAgo &&
      (product.availability === undefined ||
        product.availability === "In stock")
  );

  if (selectedCategory) {
    newListings = newListings.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (searchValue && searchValue.trim() !== "") {
    const searchLower = searchValue.trim().toLowerCase();
    newListings = newListings.filter(
      (product) =>
        product.itemName.toLowerCase().includes(searchLower) ||
        (product.description &&
          product.description.toLowerCase().includes(searchLower)) ||
        (product.keywords &&
          product.keywords.toLowerCase().includes(searchLower))
    );
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">{selectedCategory}</Typography>
      </Breadcrumbs>
      {/* Header */}
      <CategoryTitle
        titleText={selectedCategory ? selectedCategory : "New Listing"}
        subtitleText={
          selectedCategory
            ? `Browse new listings in ${selectedCategory}`
            : "See the latest items added by sellers."
        }
      />
      <Divider sx={{ mb: 2 }} />
      {/* Loading Spinner */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {newListings.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No new listings found
                {selectedCategory ? ` in ${selectedCategory}` : ""}.
              </Typography>
            </Grid>
          ) : (
            newListings.map((product) => (
              <Grid item xs={12} sm={4} md={2} key={product.id}>
                <Box sx={{ cursor: "pointer" }}>
                  <ProductItem
                    id={product.id}
                    image={product.imageUrl}
                    name={product.itemName}
                    price={product.price}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      )}
      <ProductQuickViewModal
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        product={
          selectedProduct
            ? {
                item: {
                  id: selectedProduct.id,
                  image: selectedProduct.imageUrl,
                  name: selectedProduct.itemName,
                  price: selectedProduct.price,
                  category: selectedProduct.category,
                  quality: selectedProduct.quality,
                  description: selectedProduct.description,
                  warranty: selectedProduct.warranty,
                  availability: selectedProduct.availability,
                  quantity: selectedProduct.quantity,
                  keywords: selectedProduct.keywords,
                  sellerName:
                    selectedProduct.sellerName ||
                    selectedProduct.seller ||
                    selectedProduct.userName ||
                    "Unknown",
                },
              }
            : null
        }
      />
    </Box>
  );
};

export default NewListing;
