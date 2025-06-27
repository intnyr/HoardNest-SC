import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      });
      setSuccess("Your message has been sent! Thank you for contacting us.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Email"
                type="email"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>
          {success && (
            <Box mt={2}>
              <Alert severity="success">{success}</Alert>
            </Box>
          )}
          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ContactPage;