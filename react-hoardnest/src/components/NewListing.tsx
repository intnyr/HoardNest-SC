import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import SearchAndCategories from "./SearchAndCategories";
import { ShopContext } from "../context/ShopContext";
import CategoryTitle from "./CategoryTitle";
import ProductItem from "./ProductItem";

const NewListing = () => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    console.error("ShopContext is null! Ensure it is wrapped in ShopProvider.");
    return <div>Error: ShopContext is not available.</div>;
  }

  const { products } = shopContext;

  // Filter new listings
  const newListings = products.filter((product) => product.newlisting);

  console.log(newListings);

  return (
    <Box sx={{ p: 2 }}>
      <SearchAndCategories />
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">New Listing</Typography>
      </Breadcrumbs>
      {/* Header */}
      <CategoryTitle
        titleText={"New Listing"}
        subtitleText={
          "Men's, women's, and kids' clothing, shoes, bags, jewelry, and watches."
        }
      />
      <Divider sx={{ mb: 2 }} />
      {/* Products Grid */}
      <Grid container spacing={2}>
        {newListings.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductItem
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewListing;
