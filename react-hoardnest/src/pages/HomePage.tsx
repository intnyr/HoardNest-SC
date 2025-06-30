import React, { useState } from "react";
import { Container } from "@mui/material";
import NewListing from "../components/NewListing";
import SearchAndCategories from "../components/SearchAndCategories";

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <Container maxWidth="xl">
      <SearchAndCategories
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <NewListing selectedCategory={selectedCategory} />
    </Container>
  );
};

export default HomePage;
