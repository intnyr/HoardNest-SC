import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NewListing from "../components/NewListing";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <NewListing />
      <Box textAlign="center" my={5}>
        <Typography variant="h2" gutterBottom>
          Welcome to HoardNest
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Discover, organize, and save your favorite products with ease.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/categories"
        >
          Explore Categories
        </Button>
      </Box>

      {/* About Section */}
      <Box my={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Why Choose HoardNest?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          HoardNest provides a seamless experience for managing and discovering
          products tailored to your needs.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
