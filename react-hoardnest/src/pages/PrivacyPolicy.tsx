import React from "react";
import { Container, Typography, Box } from "@mui/material";

const PrivacyPolicy: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        At HoardNest, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Information We Collect
      </Typography>
      <Typography variant="body1" paragraph>
        We collect information you provide when you register, list items, make purchases, or contact support. This may include your name, email address, contact details, and payment information.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. How We Use Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We use your information to provide and improve our services, process transactions, communicate with you, and ensure the security of our platform.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Sharing Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        We do not sell your personal information. We may share your data with trusted partners who assist us in operating the platform, as required by law, or to protect our rights.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Cookies and Tracking
      </Typography>
      <Typography variant="body1" paragraph>
        We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can manage your cookie preferences in your browser settings.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Data Security
      </Typography>
      <Typography variant="body1" paragraph>
        We implement security measures to protect your data. However, no method of transmission over the internet is 100% secure.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Your Rights
      </Typography>
      <Typography variant="body1" paragraph>
        You may access, update, or delete your personal information at any time by contacting us or using your account settings.
      </Typography>

      <Typography variant="h6" gutterBottom>
        7. Changes to This Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this Privacy Policy from time to time. We will notify you of any significant changes.
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        If you have questions about our Privacy Policy, please contact our support team.
      </Typography>
    </Box>
  </Container>
);

export default PrivacyPolicy;