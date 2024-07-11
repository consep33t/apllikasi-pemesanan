"use client";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        const orderData = { id: doc.id, ...doc.data() };
        if (
          orderData.status !==
          "Pesanan Sudah Diambil, dan Sudah Melakukan Pembayaran"
        ) {
          ordersData.push(orderData);
        }
      });
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const handleComplete = async (orderId) => {
    const response = await fetch(`/api/admin/orders/${orderId}/complete`, {
      method: "POST",
    });
    if (response.ok) {
      alert("Order completed successfully");
    } else {
      console.error("Failed to complete order");
      alert("Failed to complete order");
    }
  };

  const handlePickUp = async (orderId) => {
    const response = await fetch(`/api/admin/orders/${orderId}/pickup`, {
      method: "POST",
    });
    if (response.ok) {
      alert("Order picked up successfully");
    } else {
      console.error("Failed to pick up order");
      alert("Failed to pick up order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pesanan Diterima":
        return "bg-red-600";
      case "Pesanan Selesai, silahkan diambil":
        return "bg-yellow-600";
      case "Pesanan Sudah Diambil, dan Sudah Melakukan Pembayaran":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "Tanggal tidak tersedia";
    }
    try {
      const date = new Date(timestamp.seconds * 1000);
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Nama</th>
            <th>No. HP</th>
            <th>Menu - Harga</th>
            <th>Total</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {orders.map((order) => (
          <tbody key={order.id}>
            {order.items.map((item, index) => (
              <tr key={index}>
                {index === 0 && (
                  <>
                    <td rowSpan={order.items.length}>{order.user.name}</td>
                    <td rowSpan={order.items.length}>{order.user.phone}</td>
                  </>
                )}
                <td>
                  {item.name} - {item.price}
                </td>
                {index === 0 && (
                  <>
                    <td rowSpan={order.items.length}>
                      {order.items.reduce(
                        (total, item) => total + item.price,
                        0
                      )}
                    </td>
                    <td rowSpan={order.items.length}>
                      {formatDate(order.date)}
                    </td>
                    <td rowSpan={order.items.length}>
                      <p
                        className={`${getStatusColor(
                          order.status
                        )} text-white rounded-sm px-2 py-1 text-center`}
                      >
                        {order.status}
                      </p>
                    </td>
                    <td rowSpan={order.items.length}>
                      <button
                        onClick={() => handleComplete(order.id)}
                        className="mr-2 bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded"
                      >
                        Pesanan Selesai
                      </button>
                      <button
                        onClick={() => handlePickUp(order.id)}
                        className="mt-2 bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded"
                      >
                        Pesanan Diambil
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
