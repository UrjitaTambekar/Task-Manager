import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

export default function ReportingDashboard({
  tasks,
}) {

  const completed =
    tasks.filter(
      (t) =>
        t.status ===
        "completed"
    ).length;

  const pending =
    tasks.filter(
      (t) =>
        t.status !==
        "completed"
    ).length;

  const chartData = [
    {
      name: "Completed",
      value: completed,
    },

    {
      name: "Pending",
      value: pending,
    },
  ];

  return (
    <div>

      <h1>
        Reporting Dashboard
      </h1>

      <BarChart
        width={400}
        height={300}
        data={chartData}
      >
        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="value" />
      </BarChart>

      <PieChart
        width={400}
        height={300}
      >
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={100}
        />
      </PieChart>

    </div>
  );
}