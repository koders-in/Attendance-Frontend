import React from "react";
import { useSelector } from "react-redux";
import { IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Toggler() {
  const {
    app: { mode },
  } = useSelector((state) => state);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: "text.primary",
        borderRadius: 1,
        p: 1,
      }}
    >
      <IconButton
        title={`${mode === "dark" ? "Light" : "Dark"} mode`}
        sx={{ ml: 1 }}
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
