import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Router from "next/router";
import { useSelector } from "react-redux";

export default function Modal() {
  const { isAuthenticate } = useSelector((state) => state);

  const handleRedirect = () => {
    Router.replace("/");
  };

  return (
    <Dialog open={!isAuthenticate}>
      <DialogTitle>Attendance System</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-for unauthorized-user">
          It seems like you didn't log into the app yet. Please log in.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ width: "100px" }}
          onClick={handleRedirect}
          variant="outlined"
        >
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
}
