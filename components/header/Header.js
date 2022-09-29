import React from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import Spacer from "../spacer/Spacer";
import Toggler from "../theme-toggler/Toggler";
import { useStore } from "../../redux/Provider";

export default function Appbar() {
  const {
    dispatch,
    state: {
      user: { userAvatar },
    },
  } = useStore();

  const handleTheme = () => {
    dispatch({ type: "SET_MODE" });
  };

  return (
    <AppBar
      elevation={4}
      style={{ width: "100%", height: "60px" }}
      position="sticky"
    >
      <Toolbar style={{ height: "100%" }}>
        <Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" } }}
          >
            Koders
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton edge="end" aria-haspopup="true" color="inherit">
          {/* {userAvatar.length === 0 ? (
            <AccountCircle fontSize="large" />
          ) : (
            <Avatar src={userAvatar} />
          )} */}
        </IconButton>
        <Spacer width={15} />
        <Box onClick={handleTheme}>
          <Toggler />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
