import React from "react";
import { IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useStore } from "../../redux/Provider";

export default function Toggler() {
  const {
    state: {
      app: { mode },
    },
  } = useStore();
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
      <IconButton sx={{ ml: 1 }}>
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
