import React from "react";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { getLast7Days } from "../../lib/Feature";
ChartJS.register(
  Tooltip,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const lineChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    cutout: 120,
  },
};
const DougnotChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
const labels = getLast7Days();
const LineCharts = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue2",
        fill: true,
        backgroundColor: "rgba(75,12,102,0.3)",
        borderColor: "rgba(75,12,102,1)",
      },
    ],
  };
  return <Line data={data} options={lineChartOption} />;
};

const DougnotChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: ["rgba(50,110,112,1)", "rgba(512,122,12,1)"],
        hoverBackgroundColor:["rgba(50,110,112,0.3)","rgba(512,122,12,0.3)"],
        borderColor: ["rgba(50,110,112,0)", "rgba(512,122,12,0)"],
        offset: 20,
      },
    ],
  };
  return <Doughnut style={{zIndex:10}} data={data} options={DougnotChartOption}/>;
};

export { LineCharts, DougnotChart };
