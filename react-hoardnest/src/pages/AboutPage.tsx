import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      {/* Page Title */}
      <Box my={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          About HoardNest
        </Typography>
        <Divider sx={{ width: "50%", margin: "auto" }} />
      </Box>

      {/* About Description */}
      <Box my={3}>
        <Typography variant="body1" paragraph>
          HoardNest is your go-to platform for discovering and organizing your
          nest products. We strive to provide an intuitive and seamless
          experience, making it easier for you to browse, compare, and save
          items that matter most to you.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to create a space where users can efficiently manage
          their collections, nest, and purchases, all in one place. Whether
          you’re a casual shopper or a dedicated collector, HoardNest is built
          to cater to your needs.
        </Typography>
      </Box>

      {/* Vision and Mission */}
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          To revolutionize the way people organize and interact with their nest
          products, making discovery and collection effortless and enjoyable.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          To provide a seamless platform that empowers users to explore, save,
          and manage their nest items in a well-structured and accessible way.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
