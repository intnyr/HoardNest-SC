import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Link,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get the product name from the URL
  const decodedName = decodeURIComponent(name || "");

  // Dummy product for demonstration (replace this with actual product data fetching logic)
  const product = {
    name: decodedName,
    description: "Sample product description for " + decodedName,
    price: {
      original: 100,
      discounted: 80,
    },
    imageUrls: [
      "https://via.placeholder.com/600", // Placeholder image
    ],
  };

  return (
    <Box p={3}>
      <Box mb={2}>
        <Typography variant="body2" color="textSecondary">
          <Link href="/">Home</Link> › <Link href="/products">Products</Link> ›{" "}
          {product.name}
        </Typography>
      </Box>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Box display="flex" flexDirection="row" gap={3}>
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          style={{ width: "50%" }}
        />
        <Box>
          <Typography variant="h5">
            Price: {product.price.discounted} €
          </Typography>
          <Typography variant="body2">
            Original Price: {product.price.original} €
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
