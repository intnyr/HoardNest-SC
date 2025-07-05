import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaidIcon from "@mui/icons-material/Paid";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import TextLogo from "../text-logo-grey.svg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadSellModal from "../components/UploadSellModal";
import Button from "@mui/material/Button";

const categories = [
  {
    id: "Manage Store",
    children: [
      {
        id: "Stored Goods",
        icon: <StorefrontIcon />,
        active: true,
      },
      { id: "Earnings", icon: <PaidIcon /> },
      {
        id: "Upload & Sell",
        icon: <CloudUploadIcon />,
      },
    ],
  },
  {
    id: "Account",
    children: [
      { id: "Settings", icon: <SettingsIcon /> },
      { id: "Favorites", icon: <FavoriteIcon /> },
      { id: "Order History", icon: <ReceiptLongIcon /> },
      { id: "Password & Security", icon: <LockIcon /> },
      { id: "Shipping Address", icon: <LocalShippingIcon /> },
      { id: "Logout", icon: <LogoutIcon /> },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          {/* Logo */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Link to="/">
              <img src={TextLogo} alt="Hoarnest Logo" height="50" width="120" />
            </Link>
          </Box>
          <ListItem component={Link} to="/" sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItem>
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: "#5E3708" }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText primary={id} sx={{ color: "#fff" }} />
              </ListItem>
              {children.map(({ id: childId, icon, active }) =>
                childId === "Upload & Sell" ? (
                  <ListItem
                    disablePadding
                    key={childId}
                    sx={{ justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={icon}
                      fullWidth
                      sx={{
                        m: 1,
                        fontWeight: "bold",
                        borderRadius: 2,
                        textTransform: "none",
                        backgroundColor: "#818865",
                        "&:hover": {
                          backgroundColor: "#4e542e",
                        },
                      }}
                      onClick={() => setUploadModalOpen(true)}
                    >
                      {childId}
                    </Button>
                  </ListItem>
                ) : (
                  <ListItem disablePadding key={childId}>
                    <ListItemButton selected={active} sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={childId} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>
      </Drawer>
      <UploadSellModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  );
}
