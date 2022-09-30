import React from "react";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";

function Spinner() {
  const { isLoading } = useSelector((state) => state);

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
