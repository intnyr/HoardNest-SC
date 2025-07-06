import NestIcon from "./NestIcon";
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  onClick?: (e: React.MouseEvent) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  name,
  price,
  onClick,
}) => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    return null; // Prevents errors if the context is not available
  }

  const currency = "Php";

  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "90%",
            height: "90%",
            objectFit: "cover",
            borderRadius: "0.5rem",
          }}
        />
      </Box>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
  );
};

export default ProductItem;
