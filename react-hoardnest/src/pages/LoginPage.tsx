import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      {/* Page Title */}
      <Box my={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
      </Box>

      {/* Login Form */}
      <Box my={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" size="large">
            Login
          </Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account? <a href="/register">Sign up</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
