import React from "react";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import utils from "../../utils";
import classes from "./Chart.module.css";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const {
    attendance,
    app: { mode },
  } = useSelector((state) => state);

  // getting last 7 days data
  const xAxis = attendance?.slice(0, 7).map((d) => {
    return utils.getTimeDifference(d?.date, d?.clock_in, d?.clock_out);
  });
  const yAxis = attendance?.slice(0, 7).map((d) => {
    return d?.date;
  });

  const data = {
    labels: yAxis,
    datasets: [
      {
        data: xAxis,
        backgroundColor: xAxis.map((value) => {
          let temp = Math.round(value);
          if (temp > 8) {
            return "#3bff6c";
          } else if (temp === 8) {
            return "#ebe300";
          } else {
            return temp > 4.5 ? "#ebe300" : "#fc2d2d";
          }
        }),
      },
    ],
  };

  return (
    <Box className={classes.barchartContainer}>
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              display: false,
            },
            title: {
              display: true,
              text: "Last Seven Day's Statistics",
              color: "rgba(255,255,255,.8)",
            },
          },
          scales: [
            {
              axis: "y",
              title: {
                display: true,
                text: "Time in Hr",
              },
              grid: {
                color: "rgba(255,255,255,.2)",
                borderColor: "rgba(255,255,255,.2)",
              },
            },
          ],
          animations: {
            tension: {
              duration: 10000,
              easing: "easeOutQuad",
              from: 1,
              to: 0,
              loop: true,
            },
          },
        }}
        data={data}
      />
    </Box>
  );
}
