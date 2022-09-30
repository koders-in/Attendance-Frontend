import React from "react";
import {
  Box,
  AppBar,
  Avatar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import Router from "next/router";
import Toggler from "../theme-toggler/Toggler";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";

export default function Appbar() {
  const {
    user: { profile },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch({ type: "SET_MODE" });
  };

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: {} });
    Router.replace("/");
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
        {profile?.avatar?.length === 0 ? (
          <AccountCircle fontSize="large" />
        ) : (
          <Avatar src={profile?.avatar} />
        )}
        <Box onClick={handleTheme}>
          <Toggler />
        </Box>
        <IconButton onClick={handleLogout} title="Log Out">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
