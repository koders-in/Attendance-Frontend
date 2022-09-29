import React, { useState } from "react";
import API from "../api";
import Router from "next/router";
import { useStore } from "../redux/Provider";
import classes from "../styles/Home.module.css";
import { AppSpacer, DataLoadingSpinner } from "../components";
import { Grid, Paper, Box, TextField, Button, Typography } from "@mui/material";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const { dispatch } = useStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = data;
    if (username.length > 0 && password.length > 0) {
      dispatch({ type: "SET_LOADER" });
      const response = await API.logInUser(username, password);
      console.log(response);
      if (response !== null) {
        dispatch({ type: "SET_USER", payload: response });
        Router.push("/dashboard");
      }
      dispatch({ type: "SET_LOADER" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <Grid
      className={classes.root}
      justifyContent="center"
      alignItems="center"
      container
    >
      <Grid className={classes.inner} lg={6} item>
        <Paper className={classes.loginPaper} elevation={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            className={classes.loginPaper}
          >
            <img alt="" src="/koders.webp" className={classes.logostyle} />
            <AppSpacer height={30} />
            <Typography
              variant="h5"
              component="h2"
              style={{ color: "#00ab9c" }}
            >
              Attendence System
            </Typography>
            <AppSpacer height={10} />
            <TextField
              required
              label="Username"
              name="username"
              className={classes.textfield}
              onChange={handleChange}
            />
            <AppSpacer height={10} />
            <TextField
              className={classes.textfield}
              type="password"
              required
              label="Password"
              onChange={handleChange}
              name="password"
            />
            <AppSpacer height={20} />
            <Button
              size="large"
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Grid>
      <DataLoadingSpinner />
    </Grid>
  );
}
