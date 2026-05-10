const ResetChecklistButton = ({
  resetChecklist,
}: any) => {
  return (
    <button
      onClick={resetChecklist}
      className="bg-yellow-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-yellow-600 transition"
    >
      Reset Checklist
    </button>
  );
};

export default ResetChecklistButton;