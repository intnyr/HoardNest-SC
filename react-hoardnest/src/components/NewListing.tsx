import React from "react";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import SearchAndCategories from "../components/SearchAndCategories";
import { useNavigate } from "react-router-dom";
import productImage1 from "../media/product-01.png";
import productImage2 from "../media/product-02.png";
import productImage3 from "../media/product-03.png";
import productImage4 from "../media/product-04.png";
import productImage5 from "../media/product-05.png";
import productImage6 from "../media/product-06.png";
import productImage7 from "../media/product-07.png";
import productImage8 from "../media/product-08.png";
import productImage9 from "../media/product-09.png";
import productImage10 from "../media/product-10.png";
import productImage11 from "../media/product-11.png";
import productImage12 from "../media/product-12.png";
import productImage13 from "../media/product-13.png";
import productImage14 from "../media/product-14.png";
import productImage15 from "../media/product-15.png";

const products = [
  {
    id: 1,
    name: "Sports-casual men`s moccasins without ties with print and inscription in white and black",
    price: "Php 150.00",
    image: productImage1,
  },
  {
    id: 2,
    name: "Women`s stylish jacket with feathers and pearls in white",
    price: "Php 250.00",
    image: productImage2,
  },
  {
    id: 3,
    name: "Children`s blouse for girls with long sleeves and round neckline",
    price: "Php 150.00",
    image: productImage3,
  },
  {
    id: 4,
    name: "Modern women`s sneakers with high soles in two colors",
    price: "Php 175.00",
    image: productImage4,
  },
  {
    id: 5,
    name: "Men`s stylish small shoulder bag in three colors",
    price: "Php 100.00",
    image: productImage5,
  },
  {
    id: 6,
    name: "Men`s black wallet made of eco leather",
    price: "Php 115.00",
    image: productImage6,
  },
  {
    id: 7,
    name: "Casual men`s sneakers with embroidery",
    price: "Php 250.00",
    image: productImage7,
  },
  {
    id: 8,
    name: "Women`s slippers with high soles and inscription",
    price: "Php 125.00",
    image: productImage8,
  },
  {
    id: 9,
    name: "Modern men`s camouflage sweater with an inscription",
    price: "Php 350.00",
    image: productImage9,
  },
  {
    id: 10,
    name: "Men`s colored beach shorts",
    price: "Php 150.00",
    image: productImage10,
  },
  {
    id: 11,
    name: "Two-piece swimsuit in black with a floral motif",
    price: "Php 200.00",
    image: productImage11,
  },
  {
    id: 12,
    name: "Summer women`s dress with colorful applique cut-out model",
    price: "Php 500.00",
    image: productImage12,
  },
  {
    id: 13,
    name: "Modern women`s long denim skirt with a high waist",
    price: "Php 225.00",
    image: productImage13,
  },
  {
    id: 14,
    name: "Modern men`s tank top with animal print",
    price: "Php 120.00",
    image: productImage14,
  },
  {
    id: 15,
    name: "Children`s sports set for boys in three parts",
    price: "Php 190.00",
    image: productImage15,
  },
];

const NewListing = () => {
  const navigate = useNavigate();

  const handleProductClick = (productName: string) => {
    const encodedName = encodeURIComponent(productName); // Encode name for URL safety
    navigate(`/categories/clothing-and-accessories/${encodedName}`);
  };
  return (
    <Box sx={{ p: 2 }}>
      <SearchAndCategories />
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Clothing & Accessories</Typography>
      </Breadcrumbs>
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontStyle: "italic",
          fontWeight: "bold",
          color: "#4e542e",
        }}
      >
        Clothing & Accessories (15)
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "inherit",
          mb: 2,
        }}
        gutterBottom
      >
        Men's, women's, and kids' clothing, shoes, bags, jewelry, and watches.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {/* Products Grid */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Box
              onClick={() => handleProductClick(product.name)}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                cursor: "pointer", // Make it clear that the box is clickable
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  minWidth: 255,
                  maxHeight: 255,
                  width: "85%",
                  height: "100%",
                  marginTop: "1rem",
                  borderRadius: "0.5rem",
                }}
              />
              <Box sx={{ p: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "0 1rem",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontStyle: "italic",
                  }}
                  gutterBottom
                >
                  {product.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewListing;
