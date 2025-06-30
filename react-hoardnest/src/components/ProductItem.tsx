import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductItemProps {
  id: number;
  image: string;
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  name,
  price,
}) => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    return null; // Prevents errors if the context is not available
  }

  const currency = "Php";

  return (
    <Link to={`/categories/${id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          overflow: "hidden",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          cursor: "pointer",
        }}
      >
        <img
          src={image}
          alt={name}
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
              color: "#4e542e",
            }}
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              color: "#9f4a23",
            }}
            gutterBottom
          >
            {currency} {price}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductItem;
