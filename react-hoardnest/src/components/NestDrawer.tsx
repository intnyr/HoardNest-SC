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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const NestDrawer = ({ open, onClose, nestItems }: any) => {
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
        <IconButton onClick={onClose} aria-label="Close Nest">
          <ChevronRightIcon />
        </IconButton>
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: "#9f4a23",
          }}
        >
          My Nest
        </Typography>
      </div>
      <Divider />

      {/* Nest Items */}
      <List>
        {nestItems.map((item: any, index: number) => (
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
                aria-label={`View ${item.name} details`}
                sx={{ mr: 1 }}
                onClick={() =>
                  item.onView &&
                  item.onView({
                    item: {
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      price: item.price,
                      category: item.category,
                      quality: item.quality,
                      description: item.description,
                      warranty: item.warranty,
                      availability: item.availability,
                      quantity: item.quantity,
                      keywords: item.keywords,
                      sellerName:
                        item.sellerName ||
                        item.seller ||
                        item.userName ||
                        "Unknown",
                    },
                  })
                }
              >
                <ShoppingBagIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label={`Remove ${item.name} from nest`}
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

export default NestDrawer;
