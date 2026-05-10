"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { expenseData } from "../../data/budgetData";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const ExpenseBreakdownChart = ({ data }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[420px]">

      <h2 className="text-xl font-bold mb-6">
        Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>

          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ExpenseBreakdownChart;