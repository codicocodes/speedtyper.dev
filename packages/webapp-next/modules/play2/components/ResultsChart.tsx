import React, { RefObject, useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useCodeStore } from "../state/code-store";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const renderChart = (
  ref: RefObject<HTMLCanvasElement>,
  wpmChartData: number[]
) => {
  const ctx = ref.current?.getContext("2d");
  if (!ctx) return;
  const labels = [];
  const data = [];
  let seconds = 1;
  for (const wpm of wpmChartData) {
    labels.push(seconds);
    data.push(wpm);
    seconds++;
  }
  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "WPM each second",
          data,
          backgroundColor: "#d6bcfa",
          borderColor: "#d6bcfa",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
    },
  });
};

export default function ResultsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartWPMData = useCodeStore((state) => state.getChartWPM)();
  useEffect(() => {
    const chart = renderChart(chartRef, chartWPMData);
    return () => {
      chart?.destroy();
    };
  }, [chartWPMData]);

  return (
    <div
      className="bg-dark-lake rounded-xl mt-2 p-2"
      style={{ height: "250px" }}
    >
      <canvas ref={chartRef} />
    </div>
  );
}
