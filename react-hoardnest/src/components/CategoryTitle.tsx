import React from "react";
import { Box, Typography } from "@mui/material";

interface CategoryTitleProps {
  titleText?: string;
  subtitleText?: string;
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({
  titleText = "Title",
  subtitleText = "Subtitle",
}) => {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontStyle: "italic",
          fontWeight: "bold",
          color: "#4e542e",
        }}
      >
        {titleText}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "inherit",
          mb: 2, // `gutterBottom` can be replaced with `mb: 2`
        }}
      >
        {subtitleText}
      </Typography>
    </Box>
  );
};

export default CategoryTitle;
