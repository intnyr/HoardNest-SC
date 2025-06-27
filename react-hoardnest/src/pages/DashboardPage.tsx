import React from "react";
import { Container, Typography, Box } from "@mui/material";

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box my={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard! This page is only visible to logged-in users.
        </Typography>
      </Box>
      {/* Add dashboard widgets and content here */}
    </Container>
  );
};

export default DashboardPage;
