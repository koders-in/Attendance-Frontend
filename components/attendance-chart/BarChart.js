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
import { useStore } from "../../redux/Provider";

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
    state: {
      attendance,
      app: { mode },
    },
  } = useStore();

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
              color: mode === "dark" ? "rgba(255,255,255,.8)" : "black",
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
                color: mode === "dark" ? "rgba(255,255,255,.5)" : "black",
                borderColor: mode === "dark" ? "rgba(255,255,255,.5)" : "black",
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
