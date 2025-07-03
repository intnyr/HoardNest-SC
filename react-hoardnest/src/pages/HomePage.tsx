import React, { useState } from "react";
import { Container } from "@mui/material";
import NewListing from "../components/NewListing";
import SearchAndCategories from "../components/SearchAndCategories";

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  React.useEffect(() => {
    const handleSearch = (event: any) => {
      setSearchValue(event.detail.search || "");
      if (event.detail.category !== undefined) {
        setSelectedCategory(event.detail.category);
      }
    };
    window.addEventListener("hoardnest-search", handleSearch);
    return () => window.removeEventListener("hoardnest-search", handleSearch);
  }, []);

  return (
    <Container maxWidth="xl">
      <SearchAndCategories
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <NewListing
        selectedCategory={selectedCategory}
        searchValue={searchValue}
      />
    </Container>
  );
};

export default HomePage;
