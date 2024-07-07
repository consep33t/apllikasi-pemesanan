"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Cart({ isCartOpen, toggleCart, cart, setCart }) {
  const [user, setUser] = useState(null);
  const [descriptionOrder, setDescriptionOrder] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(savedUser);
    }
  }, []);

  const handleOrder = async () => {
    try {
      const response = await fetch("/api/admin/orders/addorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          items: cart,
          descriptionOrder,
        }),
      });

      if (response.ok) {
        setDescriptionOrder("");
        const total = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("user");
        toggleCart();
        alert(`Pesanan anda sebesar ${total} sudah diterima. Terima kasih.`);
        router.push("/");
      } else {
        alert("Terjadi kesalahan. Silahkan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan. Silahkan coba lagi.");
      console.error("Error adding order:", error);
    }
  };

  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (item) => {
    let updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    updatedCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-96 mt-5 bg-white shadow-lg p-4 h-full transform transition-transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={toggleCart} className="mb-4">
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
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <h2 className="font-bold text-lg">Keranjang</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <div className="flex gap-4">
              <button
                className="text-xl font-bold"
                onClick={() => decreaseQuantity(item)}
              >
                -
              </button>
              <button
                className="text-xl font-bold"
                onClick={() => increaseQuantity(item)}
              >
                +
              </button>
            </div>
            <span>{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="font-bold mt-4">
        Total:{" "}
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(total)}
      </p>
      <textarea
        placeholder="Deskripsi pesanan"
        value={descriptionOrder}
        className="w-full mt-4"
        onChange={(e) => setDescriptionOrder(e.target.value)}
      ></textarea>
      <button
        className="mt-4 p-2 bg-blue-500 text-white w-full"
        onClick={handleOrder}
      >
        Pesan
      </button>
    </div>
  );
}
