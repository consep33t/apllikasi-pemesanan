"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/navBar";
import MenuCard from "../components/menuCard";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/admin/dashboard/menu`
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

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Navbar cart={cart} setCart={setCart} />{" "}
      <div className="p-4 ">
        <h1 className="text-2xl font-bold mt-16 mb-5">Menu Nasi Goreng</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
