import React from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsAndConditions: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to HoardNest! By using our platform, you agree to the following
        terms and conditions. Please read them carefully.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. User Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        You are responsible for the accuracy of the information you provide and
        for keeping your account secure. Do not share your password with others.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Listing Items
      </Typography>
      <Typography variant="body1" paragraph>
        All items listed for sale must be accurately described. You must
        disclose any defects or issues with your items. Prohibited items,
        including illegal goods, counterfeit products, and hazardous materials,
        are not allowed.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Transactions
      </Typography>
      <Typography variant="body1" paragraph>
        All transactions must comply with local laws and regulations. HoardNest
        is not responsible for disputes between buyers and sellers, but we
        encourage fair and honest dealings.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Content and Conduct
      </Typography>
      <Typography variant="body1" paragraph>
        You agree not to post offensive, misleading, or inappropriate content.
        HoardNest reserves the right to remove any content or suspend accounts
        that violate these terms.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Privacy
      </Typography>
      <Typography variant="body1" paragraph>
        Your privacy is important to us. Please review our Privacy Policy to
        understand how we collect, use, and protect your information.
      </Typography>
      <Typography variant="h6" gutterBottom>
        6. Product Warranty Policy
      </Typography>
      <Typography variant="body1" paragraph>
        Sellers on HoardNest may choose to offer a warranty for their listed
        items. If a warranty is provided, the duration and any exclusions will
        be clearly stated in the product listing. Warranty coverage may include
        options such as 1 day, 3 days, 1 week, 1 month, or a custom duration
        specified by the seller. Exclusions to the warranty (such as accidental
        damage, misuse, or normal wear and tear) will also be disclosed by the
        seller.
      </Typography>
      <Typography variant="body1" paragraph>
        If a seller marks an item as "sold as-is," no warranty is provided and
        the buyer accepts the item in its current condition. Buyers are
        encouraged to review the warranty details and exclusions before making a
        purchase. HoardNest is not responsible for enforcing warranty agreements
        between buyers and sellers, but we encourage both parties to honor the
        terms stated in the product listing.
      </Typography>
      <Typography variant="body1" paragraph>
        For any disputes regarding warranties, buyers and sellers should
        communicate directly to resolve the issue. If further assistance is
        needed, please contact HoardNest support.
      </Typography>
      <Typography variant="h6" gutterBottom>
        7. Changes to Terms
      </Typography>
      <Typography variant="body1" paragraph>
        HoardNest may update these terms at any time. Continued use of the
        platform constitutes acceptance of the new terms.
      </Typography>
      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        If you have any questions about these terms, please contact our support
        team.
      </Typography>
    </Box>
  </Container>
);

export default TermsAndConditions;
