import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      {/* Page Title */}
      <Box my={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
      </Box>

      {/* Contact Form */}
      <Box my={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Email"
              type="email"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Subject" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" size="large">
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage;
