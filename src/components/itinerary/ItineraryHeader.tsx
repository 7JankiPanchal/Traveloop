interface Props {
  title: string;
}

const ItineraryHeader = ({ title }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h1 className="text-3xl font-bold text-gray-800">
        {title}
      </h1>

      <p className="text-gray-500 mt-2">
        Public Shared Itinerary
      </p>

    </div>
  );
};

export default ItineraryHeader;