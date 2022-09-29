import React from "react";
import { useStore } from "../../redux/Provider";
import { Backdrop, CircularProgress } from "@mui/material";

function Spinner() {
  const {
    state: { isLoading },
  } = useStore();
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={() => {}}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default Spinner;
