import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const LessonChart = ({ data }) => {
  return (
    <div className="card chart-card">
      <div className="card-header-row">
        <h2 className="card-title">Lessons by MOET level</h2>
        <span className="chip-soft">Content coverage</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barSize={28}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#27272f"
          />
          <XAxis
            dataKey="level"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              borderRadius: 12,
              border: "1px solid #111827",
              fontSize: 12,
            }}
            labelStyle={{ color: "#e5e7eb" }}
          />
          <Bar
            dataKey="count"
            radius={[8, 8, 4, 4]}
            fill="#3b82f6"
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LessonChart;
