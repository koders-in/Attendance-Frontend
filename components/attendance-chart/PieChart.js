import React, { useEffect, useState } from "react";
import utils from "../../utils";
import classes from "./Chart.module.css";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";

function AttendancePieChart() {
  const [data, setData] = useState([]);
  const { attendance } = useSelector((state) => state);

  useEffect(() => {
    let arr = [];
    if (attendance === undefined) return;
    if (attendance.length === 0) return;
    for (const item of attendance) {
      arr.push(utils.getUserPresenceCount(item));
    }
    setData([...arr]);
  }, [attendance]);

  return (
    <Box className={classes.piechartContainer}>
      <Box className={classes.piechartText}>
        <Typography fontSize="1rem" paragraph>
          Attendence status
        </Typography>
        <div className={classes.legendContainer}>
          <div className={classes.legend}>
            <span style={{ background: "#3bff6c" }} />
            Present
          </div>
          <div className={classes.legend}>
            <span style={{ background: "#fc2d2d" }} />
            Absent
          </div>
          <div className={classes.legend}>
            <span style={{ background: "#ebe300" }} />
            Half Day
          </div>
        </div>
      </Box>
      <PieChart
        data={[
          {
            title: "Present",
            value: data.filter((d) => d?.tag === "present").length,
            color: "#3bff6c",
          },
          {
            title: "Absent",
            value: data.filter((d) => d?.tag === "absent").length,
            color: "#fc2d2d",
          },
          {
            title: "Half Day",
            value: data.filter((d) => d?.tag === "half").length,
            color: "#ebe300",
          },
        ]}
        lineWidth={10}
        startAngle={-90}
        paddingAngle={1}
        radius={40}
      />
    </Box>
  );
}

export default AttendancePieChart;
