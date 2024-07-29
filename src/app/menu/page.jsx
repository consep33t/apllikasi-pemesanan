"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/navBar";
import MenuCard from "../components/menuCard";
import Modal from "../components/modal";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/dashboard/menu`
        );
        const data = await response.json();
        if (response.ok) {
          setMenuItems(data.data);
        } else {
          console.error("Failed to fetch menu items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCardClick = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/dashboard/menu/${id}`
      );
      const data = await response.json();
      setSelectedItem(data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching menu item:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Navbar cart={cart} setCart={setCart} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mt-16 mb-5">Menu Nasi Goreng</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              addToCart={addToCart}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      </div>
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
          <div className="bg-white p-4 rounded-lg w-2/3 relative">
            <Modal item={selectedItem} addToCart={addToCart} />
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
}
