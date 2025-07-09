import React, { useState } from "react";
import {
  Box,
  InputBase,
  Typography,
  Link,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SearchAndMenuProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const SearchAndMenu: React.FC<SearchAndMenuProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const [search, setSearch] = useState("");

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

  // Function to format category links
  const formatCategoryLink = (category: string) => {
    return category
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with "-"
      .replace(/&/g, "and"); // Replace "&" with "and"
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 15, // Adjust for visible items
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 11,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  // Use Material-UI theme and media query to detect screen width
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = () => {
    // Dispatch a custom event with the search value and selected category
    window.dispatchEvent(
      new CustomEvent("hoardnest-search", {
        detail: {
          search,
          category: selectedCategory,
        },
      })
    );
  };

  return (
    <Box sx={{ padding: "0 1rem" }}>
      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(66, 36, 36, 0.05)",
          borderRadius: 2,
          px: 1,
          py: 0.5,
          mb: 1,
          mt: 2,
        }}
      >
        <InputBase
          placeholder="Find your nest item now..."
          type="text"
          aria-label="Search Nest"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          sx={{
            ml: 1,
            backgroundColor: "transparent",
          }}
        />
        <IconButton
          sx={{ color: "inherit", p: 1 }}
          onClick={handleSearch}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Categories Navigation Menu */}
      {!isSmallScreen && (
        <Slider {...settings}>
          {categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                margin: "0 15px",
                p: 1,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                href="#"
                underline="hover"
                color={selectedCategory === category ? "primary" : "#4e542e"}
                sx={{
                  minWidth: 100,
                  maxWidth: 250,
                  textDecoration: "none",
                  backgroundColor:
                    selectedCategory === category ? "#d1e7dd" : "#e7dbcd",
                  height: 50,
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRight: "2px solid #ccc",
                  padding: "0 16px",
                  pt: 0.75,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onCategorySelect(
                    category === selectedCategory ? "" : category
                  );
                }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    lineHeight: "1.25",
                    textAlign: "center",
                  }}
                >
                  {category}
                </Typography>
              </Link>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default SearchAndMenu;
