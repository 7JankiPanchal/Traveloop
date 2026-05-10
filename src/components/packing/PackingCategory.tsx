import PackingItem from "./PackingItem";

const PackingCategory = ({
  category,
  items,
  togglePacked,
  removeItem,
}: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-5">
        {category}
      </h2>

      <div className="space-y-3">

        {items.length === 0 ? (
          <p className="text-gray-500">
            No items added.
          </p>
        ) : (
          items.map((item: any) => (
            <PackingItem
              key={item.id}
              item={item}
              togglePacked={togglePacked}
              removeItem={removeItem}
            />
          ))
        )}

      </div>

    </div>
  );
};

export default PackingCategory;