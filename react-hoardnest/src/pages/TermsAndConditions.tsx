import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsAndConditions: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to HoardNest! By using our platform, you agree to the following terms and conditions. Please read them carefully.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. User Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        You are responsible for the accuracy of the information you provide and for keeping your account secure. Do not share your password with others.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Listing Items
      </Typography>
      <Typography variant="body1" paragraph>
        All items listed for sale must be accurately described. You must disclose any defects or issues with your items. Prohibited items, including illegal goods, counterfeit products, and hazardous materials, are not allowed.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Transactions
      </Typography>
      <Typography variant="body1" paragraph>
        All transactions must comply with local laws and regulations. HoardNest is not responsible for disputes between buyers and sellers, but we encourage fair and honest dealings.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Content and Conduct
      </Typography>
      <Typography variant="body1" paragraph>
        You agree not to post offensive, misleading, or inappropriate content. HoardNest reserves the right to remove any content or suspend accounts that violate these terms.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Privacy
      </Typography>
      <Typography variant="body1" paragraph>
        Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Changes to Terms
      </Typography>
      <Typography variant="body1" paragraph>
        HoardNest may update these terms at any time. Continued use of the platform constitutes acceptance of the new terms.
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        If you have any questions about these terms, please contact our support team.
      </Typography>
    </Box>
  </Container>
);

export default TermsAndConditions;