import {
  Paper,
  Stack,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import React from "react";
import classes from "./Card.module.css";
import { useSelector } from "react-redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PunchClockIcon from "@mui/icons-material/PunchClock";

function DashboardCards() {
  const { user } = useSelector((state) => state);

  return (
    <Stack
      className={classes.cardContainer}
      direction="row"
      justifyContent="space-between"
    >
      <Paper className={classes.cardPaper}>
        <ListItem>
          <ListItemAvatar>
            <AccountBoxIcon fontSize="large" />
          </ListItemAvatar>
          <ListItemText
            primary={user?.profile?.firstname || "User name"}
            secondary={user?.profile?.position || "Designation"}
          />
        </ListItem>
      </Paper>
      <Paper className={classes.cardPaper}>
        <ListItem>
          <ListItemAvatar>
            <AssignmentIcon fontSize="large" />
          </ListItemAvatar>
          <ListItemText
            primary={`${user?.issues?.resolvedIssues || 0}/${
              user?.issues?.currentIssues || 0
            }`}
            secondary={`Resolved/Total Issues`}
          />
        </ListItem>
      </Paper>
      <Paper className={classes.cardPaper}>
        <ListItem>
          <ListItemAvatar>
            <PunchClockIcon fontSize="large" />
          </ListItemAvatar>
          <ListItemText
            primary={`${user?.spentTime?.logtime || 0}/${
              user?.spentTime?.requiredLogTime || 40
            }`}
            secondary="Spent Time (Hrs)"
          />
        </ListItem>
      </Paper>
    </Stack>
  );
}

export default DashboardCards;
