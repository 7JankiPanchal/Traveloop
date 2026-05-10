"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { dailyExpenseData } from "../../data/budgetData";

const DailyExpenseBarChart = ({ data }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[420px]">

      <h2 className="text-xl font-bold mb-6">
        Daily Expenses
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={dailyExpenseData}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="expense" fill="#3B82F6" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default DailyExpenseBarChart;