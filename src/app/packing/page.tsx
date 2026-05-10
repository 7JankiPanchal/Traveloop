"use client";

import { useState } from "react";

import PackingHeader from "@/components/packing/PackingHeader";
import AddItemForm from "@/components/packing/AddItemForm";
import PackingCategory from "@/components/packing/PackingCategory";
import ResetChecklistButton from "@/components/packing/ResetChecklistButton";

import { packingItems as initialItems } from "@/data/packingData";

const PackingPage = () => {

  const [items, setItems] = useState(initialItems);

  const addItem = (name: string, category: string) => {

    const newItem = {
      id: Date.now(),
      name,
      category,
      packed: false,
    };

    setItems([...items, newItem]);
  };

  const togglePacked = (id: number) => {

    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, packed: !item.packed }
          : item
      )
    );
  };

  const removeItem = (id: number) => {

    setItems(items.filter((item) => item.id !== id));
  };

  const resetChecklist = () => {

    setItems(
      items.map((item) => ({
        ...item,
        packed: false,
      }))
    );
  };

  const categories = [
    "Clothing",
    "Documents",
    "Electronics",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <PackingHeader />

        <AddItemForm addItem={addItem} />

        <div className="space-y-6 mt-6">

          {categories.map((category) => (

            <PackingCategory
              key={category}
              category={category}
              items={items.filter(
                (item) => item.category === category
              )}
              togglePacked={togglePacked}
              removeItem={removeItem}
            />

          ))}

        </div>

        <div className="mt-8">

          <ResetChecklistButton
            resetChecklist={resetChecklist}
          />

        </div>

      </div>

    </div>
  );
};

export default PackingPage;