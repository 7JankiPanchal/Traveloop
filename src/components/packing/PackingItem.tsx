const PackingItem = ({
  item,
  togglePacked,
  removeItem,
}: any) => {
  return (
    <div className="flex items-center justify-between border rounded-xl p-4">

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => togglePacked(item.id)}
          className="w-5 h-5"
        />

        <span
          className={
            item.packed
              ? "line-through text-gray-400"
              : ""
          }
        >
          {item.name}
        </span>

      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>

    </div>
  );
};

export default PackingItem;
