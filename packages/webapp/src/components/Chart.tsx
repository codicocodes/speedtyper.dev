import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import cpmToWpm from "../utils/cpmToWpm";

const renderChart = (
  ref: React.MutableRefObject<any>,
  cpmTimeSeries: { cpm: number }[]
) => {
  const ctx = ref?.current.getContext("2d");

  const labels = [];
  const data = [];
  const backgroundColor = [];

  let seconds = 0;

  for (const { cpm } of cpmTimeSeries) {
    labels.push(seconds);
    data.push(cpmToWpm(cpm));
    backgroundColor.push("#d6bcfa");
    seconds++;
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          fill: "origin",
          label: "WPM each second",
          data,
          backgroundColor,
          borderColor: ["#d6bcfa"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "seconds",
            },
            gridLines: {
              color: "#18181b",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "WPM",
            },
            gridLines: {
              color: "#18181b",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

export default function ChartContainer({ cpmTimeSeries }) {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      renderChart(chartRef, cpmTimeSeries);
    }
  }, [chartRef.current]);

  return (
    <div
      className="max-w-5 xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-2 py-2 text-lg text-off-white font-light rounded"
      style={{ height: "250px" }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};
