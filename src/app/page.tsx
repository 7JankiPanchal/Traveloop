import BudgetSummaryCard from "@/components/budget/BudgetSummaryCard";
import ExpenseBreakdownChart from "@/components/budget/ExpenseBreakdownChart";
import DailyExpenseBarChart from "../components/budget/DailyExpenseBarChart";
import DailyBudgetAlert from "../components/budget/DailyBudgetAlert";

import {
  summaryData,
} from "../data/budgetData";

const TripBudgetScreen = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Trip Budget & Cost Breakdown
          </h1>

          <p className="text-gray-500 mt-2">
            Track your travel expenses and stay within budget.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <BudgetSummaryCard
            title="Total Budget"
            amount={summaryData.totalBudget}
          />

          <BudgetSummaryCard
            title="Total Spent"
            amount={summaryData.totalSpent}
          />

          <BudgetSummaryCard
            title="Average Cost / Day"
            amount={summaryData.averagePerDay}
          />

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <ExpenseBreakdownChart />

          <DailyExpenseBarChart />

        </div>

        {/* Alert */}
        <DailyBudgetAlert />

      </div>
    </div>
  );
};

export default TripBudgetScreen;