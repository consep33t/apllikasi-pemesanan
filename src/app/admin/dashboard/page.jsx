"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      const response = await fetch("/api/admin/dashboard/menu/addmenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
          imageName: image.name,
          imageData: base64String,
          type,
        }),
      });

      if (response.ok) {
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setType("");
        alert("Menu added successfully!");
      } else {
        alert("Error adding menu.");
      }

      setLoading(false);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <textarea
            value={type}
            placeholder="pilih salah satu dari makanan, minuman, atau condimen"
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#B11824] text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
}
