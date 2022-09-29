import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  Header,
  DashboardTable,
  DashboardChart,
  DataLoadingSpinner,
  DashboardCards,
  AppSpacer,
} from "../../components";
import classes from "../../styles/Dashboard.module.css";
import { useAttendance } from "../../hooks/useAttendance";
import { useToatalAttendanceCount } from "../../hooks/useTotalCount";
import { useStore } from "../../redux/Provider";

function index() {
  useToatalAttendanceCount();
  useAttendance();

  const {
    state: {
      app: { mode },
      user,
    },
  } = useStore();

  useEffect(() => {
    if (Object.keys(user).length === 0 || user === null || user === undefined) {
      return Router.push("/");
    }
  }, []);

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

  return (
    <div className="app">
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
