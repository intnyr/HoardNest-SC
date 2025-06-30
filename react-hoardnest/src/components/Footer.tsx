import React from "react";
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      component="footer"
      sx={{ py: 3, textAlign: "center" }}
    >
      {/* Social Media Links */}
      <Box display="flex" justifyContent="center" gap={1}>
        <IconButton
          component={Link}
          href="https://www.facebook.com/HoardNest/"
          target="_blank"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.instagram.com/HoardNest/"
          target="_blank"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.pinterest.com/HoardNest/"
          target="_blank"
          aria-label="Pinterest"
        >
          <PinterestIcon />
        </IconButton>
      </Box>

      {/* Legal Links */}
      <Box display="flex" justifyContent="center" gap={1}>
        <Link href="/privacy-policy" underline="hover">
          Policy
        </Link>
        <Link href="/contact" underline="hover">
          Contact
        </Link>
        <Link href="/about" underline="hover">
          About Us
        </Link>
      </Box>

      {/* Copyright Info */}
      <Typography variant="body2" color="textSecondary">
        Copyright © 2025 - 2026 HoarNest
      </Typography>
      {/* <Typography variant="body2" color="textSecondary">
        Prices include VAT and, if applicable, additional shipping costs.
      </Typography> */}
    </Container>
  );
};

export default Footer;
