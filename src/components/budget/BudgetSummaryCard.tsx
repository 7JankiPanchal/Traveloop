interface Props {
  title: string;
  amount: number;
}

const BudgetSummaryCard = ({ title, amount }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-lg font-semibold text-gray-600">
        {title}
      </h2>

      <p className="text-3xl font-bold text-blue-600 mt-3">
        ₹{amount}
      </p>

    </div>
  );
};

export default BudgetSummaryCard;