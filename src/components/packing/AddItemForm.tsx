"use client";

import { useState } from "react";

const AddItemForm = ({ addItem }: any) => {

  const [name, setName] = useState("");

  const [category, setCategory] = useState("Clothing");

  const handleSubmit = (e: any) => {

    e.preventDefault();

    if (!name) return;

    addItem(name, category);

    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 mt-6"
    >

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Add item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-xl p-3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl p-3"
        >

          <option>Clothing</option>

          <option>Documents</option>

          <option>Electronics</option>

        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition"
        >
          Add Item
        </button>

      </div>

    </form>
  );
};

export default AddItemForm;