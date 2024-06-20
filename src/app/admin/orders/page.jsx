// app/admin/orders/page.js
"use client";
import { useState, useEffect } from "react";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersList = [];
      querySnapshot.forEach((doc) =>
        ordersList.push({ id: doc.id, ...doc.data() })
      );
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);

  const handleComplete = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "Selesai" });
  };

  const handlePickUp = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "Diambil" });
  };

  return (
    <div>
      <h1>Pesanan</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>
            {order.user.name} - {order.user.phone}
          </h2>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
          <p>Status: {order.status}</p>
          <button onClick={() => handleComplete(order.id)}>
            Pesanan Selesai
          </button>
          <button onClick={() => handlePickUp(order.id)}>
            Pesanan Diambil
          </button>
        </div>
      ))}
    </div>
  );
}
