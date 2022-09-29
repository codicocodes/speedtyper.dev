import React, { useEffect } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import cpmToWpm from "../utils/cpmToWpm";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const renderChart = (
  ref: React.MutableRefObject<any>,
  cpmTimeSeries: { cpm: number }[]
) => {
  const ctx = ref?.current.getContext("2d");

  const labels = [];

  const data = [];

  let seconds = 0;

  for (const { cpm } of cpmTimeSeries) {
    labels.push(seconds);
    data.push(cpmToWpm(cpm));
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
    },
  });
};

export default function ChartContainer({
  cpmTimeSeries,
}: {
  cpmTimeSeries: any[];
}) {
  const chartRef = React.createRef<HTMLCanvasElement>();

  useEffect(() => {
    const chart = renderChart(chartRef, cpmTimeSeries);
    return () => {
      chart.destroy();
    };
  }, [cpmTimeSeries]);

  return (
    <div
      className="max-w-5 xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-2 py-2 text-lg text-off-white font-light rounded"
      style={{ height: "250px" }}
    >
      <canvas ref={chartRef} />
    </div>
  );
}
