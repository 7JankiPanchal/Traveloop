const DailyBudgetAlert = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 rounded-2xl p-5">

      <h2 className="font-bold text-lg">
        Budget Alert
      </h2>

      <p className="mt-2">
        Day 4 expenses exceeded your planned daily budget.
      </p>

    </div>
  );
};

export default DailyBudgetAlert;