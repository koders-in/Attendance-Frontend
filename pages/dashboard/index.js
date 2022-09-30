import React from "react";
import {
  Grid,
  Paper,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import {
  Header,
  AppSpacer,
  DashboardTable,
  DashboardChart,
  DashboardCards,
  DataLoadingSpinner,
  UnAuthorizedUserModal,
} from "../../components";
import { useSelector } from "react-redux";
import Head from "next/head";
import classes from "../../styles/Dashboard.module.css";
import { useAttendance } from "../../hooks/useAttendance";
import { useToatalAttendanceCount } from "../../hooks/useTotalCount";

function index() {
  useToatalAttendanceCount();
  useAttendance();

  const {
    app: { mode },
    isAuthenticate,
  } = useSelector((state) => state);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#00ab9c",
          },
        },
      }),
    [mode]
  );

  return !Boolean(isAuthenticate) ? (
    <UnAuthorizedUserModal />
  ) : (
    <div className="app">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Attendance Dashboard</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container className={classes.dashboardContainer} disableGutters>
          <Grid className={classes.dashboarGrid} container>
            <Grid
              item
              className={classes.dashboardLeftGrid}
              xs={12}
              sm={12}
              lg={8}
            >
              <DashboardCards />
              <AppSpacer height={10} />
              <Paper elevation={4} className={classes.dashboardLeftGridPaper}>
                <DashboardTable />
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.dashboardLeftGrid}
              xs={12}
              sm={12}
              lg={4}
            >
              <Paper className={classes.dashboardRightGridPaper} elevation={4}>
                <DashboardChart />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
      <DataLoadingSpinner />
    </div>
  );
}

export default index;
