import React from "react";
import { Container } from "@mui/material";
import NewListing from "../components/NewListing";
import DashboardPage from "./DashboardPage";
import PrivateRoute from "../components/PrivateRoute";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <NewListing />
                  <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
    </Container>
  );
};

export default HomePage;
