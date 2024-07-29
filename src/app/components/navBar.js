"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cart from "./cart";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar({ cart, setCart }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

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

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/");
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <div className="fixed w-full z-10 bg-white shadow">
        <div className="flex justify-between items-center p-4">
          <div className="text-lg font-semibold space-x-4">
            {user && <span>Hi, {user.name}</span>}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
            >
              logout
            </button>
          </div>
          <div className="lg:hidden flex space-x-4 items-center">
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
            <button onClick={toggleCart} className="relative">
              <Image
                src="/cart.svg"
                width={30}
                height={30}
                alt="cart"
                className="w-7 h-7"
              />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
          <div className="hidden lg:flex space-x-4 items-center">
            <Link
              className="px-3 py-1 border-red-500 border hover:text-white hover:bg-red-500 rounded-md"
              href="/menu/makanan"
            >
              Menu Makanan
            </Link>
            <Link
              className="px-3 py-1 border-red-500 border hover:text-white hover:bg-red-500 rounded-md"
              href="/menu/minuman"
            >
              Minuman
            </Link>
            <Link
              className="px-3 py-1 border-red-500 border hover:text-white hover:bg-red-500 rounded-md"
              href="/menu/condimen"
            >
              condimen
            </Link>
            <button onClick={toggleCart} className="relative">
              <Image
                src="/cart.svg"
                width={30}
                height={30}
                alt="cart"
                className="w-7 h-7"
              />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/menu/makanan"
              onClick={toggleMenu}
              className="z-20 pointer-events-auto"
            >
              Menu Makanan
            </Link>
            <Link
              href="/menu/minuman"
              onClick={toggleMenu}
              className="z-20 pointer-events-auto"
            >
              Minuman
            </Link>
            <Link
              href="/menu/condimen"
              onClick={toggleMenu}
              className="z-20 pointer-events-auto"
            >
              Condimen
            </Link>
            <Link
              href="/menu"
              onClick={toggleMenu}
              className="z-20 pointer-events-auto"
            >
              Semua Menu
            </Link>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50 pointer-events-auto"
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
