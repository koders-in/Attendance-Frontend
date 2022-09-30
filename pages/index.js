import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Alert,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import API from "../api";
import Head from "next/head";
import Router from "next/router";
import { useDispatch } from "react-redux";
import classes from "../styles/Home.module.css";
import { AppSpacer, DataLoadingSpinner } from "../components";

export default function Login() {
  const dispatch = useDispatch();
  const [isAlert, setAlert] = useState({ show: false, msg: "" });
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = data;
    if (username.length > 0 && password.length > 0) {
      dispatch({ type: "SET_LOADER" });
      const response = await API.logInUser(username, password);
      if (response !== null) {
        dispatch({ type: "SET_USER", payload: response });
        Router.push("/dashboard");
      } else
        setAlert({
          msg: "Something went wrong — Please try again!",
          show: true,
        });
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
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Koders Attendance | Login</title>
      </Head>
      <Grid className={classes.inner} lg={6} item>
        <Paper className={classes.loginPaper} elevation={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            className={classes.loginPaper}
          >
            <img
              alt="koders"
              src="/koders.webp"
              className={classes.logostyle}
            />
            <AppSpacer height={10} />
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
            <AppSpacer height={10} />
            {isAlert.show && <Alert severity="warning">{isAlert.msg}</Alert>}
          </Box>
        </Paper>
      </Grid>
      <DataLoadingSpinner />
    </Grid>
  );
}
