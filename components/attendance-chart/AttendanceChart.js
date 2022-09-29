import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

function AttendanceChart() {
  return (
    <React.Fragment>
      <PieChart />
      <BarChart />
    </React.Fragment>
  );
}

export default AttendanceChart;