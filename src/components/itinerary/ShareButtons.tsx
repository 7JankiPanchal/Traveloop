const ShareButtons = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-xl font-bold mb-4">
        Share Itinerary
      </h2>

      <div className="flex gap-4">

        <button className="bg-green-500 text-white px-4 py-2 rounded-xl">
          WhatsApp
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">
          Facebook
        </button>

        <button className="bg-pink-500 text-white px-4 py-2 rounded-xl">
          Instagram
        </button>

      </div>

    </div>
  );
};

export default ShareButtons;