import React from "react";
import { Container } from "@mui/material";
import NewListing from "../components/NewListing";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <NewListing />
    </Container>
  );
};

export default HomePage;
