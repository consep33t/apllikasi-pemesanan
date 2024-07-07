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
    <div className="w-full h-screen">
      <h1 className="text-center text-2xl font-bold my-4">Pesanan</h1>
      <div className="container mx-auto mt-4 w-full">
        <div className="flex overflow-x-auto w-full h-full">
          <table className="w-full h-full table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  Nama
                </th>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  No. HP
                </th>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  Menu - Harga
                </th>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  Total
                </th>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  Tanggal
                </th>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  Status
                </th>
                <th className="border border-black px-2 py-1 md:px-4 md:py-2">
                  Actions
                </th>
              </tr>
            </thead>
            {orders.map((order) => (
              <tbody key={order.id}>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    {index === 0 && (
                      <>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
                          {order.user.name}
                        </td>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
                          {order.user.phone}
                        </td>
                      </>
                    )}
                    <td className="border border-black px-2 py-1 md:px-4 md:py-2">
                      {item.name} - {item.price}
                    </td>
                    {index === 0 && (
                      <>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
                          {order.items.reduce(
                            (total, item) => total + item.price,
                            0
                          )}
                        </td>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
                          {formatDate(order.date)}
                        </td>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
                          <p
                            className={`${getStatusColor(
                              order.status
                            )} text-white rounded-sm px-2 py-1 text-center`}
                          >
                            {order.status}
                          </p>
                        </td>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
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
      </div>
    </div>
  );
}
