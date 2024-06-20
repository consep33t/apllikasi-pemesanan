"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cart from "./Cart";

export default function Navbar({ cart, setCart }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(savedUser);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <div className="fixed w-full z-10 bg-white shadow">
        <div className="flex justify-between items-center p-4">
          <div className="text-lg font-semibold">
            {user && <span>Hi, {user.name}</span>}
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex space-x-4">
            <Link href="/menu">Menu Makanan</Link>
            <Link href="/drinks">Minuman</Link>
            <button onClick={toggleCart}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18M9 3v18m6-18v18m-3-5h2m-2-4h2m-2-4h2m-2-4h2m-2-4h2"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center space-y-4">
            <Link href="/menu" onClick={toggleMenu}>
              Menu Makanan
            </Link>
            <Link href="/drinks" onClick={toggleMenu}>
              Minuman
            </Link>
            <button onClick={toggleCart}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18M9 3v18m6-18v18m-3-5h2m-2-4h2m-2-4h2m-2-4h2m-2-4h2"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
      <Cart
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}
