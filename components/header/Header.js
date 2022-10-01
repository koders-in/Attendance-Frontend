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
import AppSpacer from "../spacer/Spacer";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";

export default function Appbar() {
  const {
    user: { profile },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: {} });
    Router.replace("/");
  };

  return (
    <AppBar
      elevation={10}
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
        <AppSpacer width={20} />

        <IconButton onClick={handleLogout} title="Log Out">
          <LogoutIcon className="white-color" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
