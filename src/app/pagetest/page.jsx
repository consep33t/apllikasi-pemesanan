"use client";
import React, { useState, useEffect } from "react";
import MenuCard from "../components/menuCard";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/admin/dashboard/menu");
        const data = await response.json();
        setMenuItems(data.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleCardClick = async (id) => {
    try {
      const response = await fetch(`/api/admin/dashboard/menu/${id}`);
      const data = await response.json();
      setSelectedItem(data.data);
      setIsModalOpen(true); // Buka modal ketika item dipilih
    } catch (error) {
      console.error("Error fetching menu item:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const addToCart = (item) => {
    // Implementasikan fungsi tambah ke keranjang Anda di sini
    console.log("Tambah ke keranjang:", item);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 cursor-pointer"
            onClick={() => handleCardClick(item.id)}
          >
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <MenuCard item={selectedItem} addToCart={addToCart} />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
