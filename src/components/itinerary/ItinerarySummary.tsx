const ItinerarySummary = ({ itinerary }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Trip Summary
      </h2>

      <div className="space-y-3 text-gray-700">

        <p>
          <strong>Destination:</strong>
          {" "}
          {itinerary.destination}
        </p>

        <p>
          <strong>Duration:</strong>
          {" "}
          {itinerary.duration}
        </p>

        <p>
          <strong>Budget:</strong>
          {" "}
          {itinerary.budget}
        </p>

        <p>
          <strong>Description:</strong>
          {" "}
          {itinerary.description}
        </p>

      </div>

    </div>
  );
};

export default ItinerarySummary;