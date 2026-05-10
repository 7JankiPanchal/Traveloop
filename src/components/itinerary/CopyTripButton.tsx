const CopyTripButton = () => {

  const handleCopy = () => {
    alert("Trip copied successfully!");
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-600 text-white rounded-2xl p-5 text-lg font-semibold shadow-md hover:bg-blue-700 transition"
    >
      Copy Trip
    </button>
  );
};

export default CopyTripButton;