import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";

const WishlistDrawer = ({ open, onClose, wishlistItems }: any) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          padding: 2,
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <IconButton onClick={onClose} aria-label="Close Wishlist">
          <ChevronRightIcon />
        </IconButton>
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "#9f4a23",
          }}
        >
          My Wishlist
        </Typography>
      </div>
      <Divider />

      {/* Wishlist Items */}
      <List>
        {wishlistItems.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 40, height: 40 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "body2",
                  gutterBottom: true,
                  sx: {
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  },
                }}
              />
              <IconButton
                edge="end"
                aria-label={`Remove ${item.name} from wishlist`}
                onClick={() => item.onRemove(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default WishlistDrawer;
