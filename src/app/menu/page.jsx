"use client";
import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/navBar";
import Image from "next/image";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const items = [];
      querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
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
    <div>
      <Navbar cart={cart} setCart={setCart} />{" "}
      {/* Pass cart and setCart as props */}
      <div className="pt-16">
        <h1>Menu Nasi Goreng</h1>
        <div>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Image
                width={200}
                height={200}
                layout="responsive"
                src={item.image}
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.price}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <button
                  className="bg-[#d9727b] hover:bg-[#B11824] text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(item)}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
