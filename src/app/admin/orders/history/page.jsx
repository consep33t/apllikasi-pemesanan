"use client";
import { useState, useEffect } from "react";
import { NextResponse } from "next/server";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders/history");
      const data = await response.json();
      if (response.status === 200) {
        setOrders(data.data);
      } else {
        console.error("Failed to fetch orders history:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders history:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleDeleteOrder = async (orderId) => {
    const response = await fetch(`/api/admin/orders/history/${orderId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Order deleted successfully");
      await fetchOrders();
      return NextResponse.json({ status: 200, message: "Order deleted" });
    } else {
      console.error("Failed to complete order");
    }
  };

  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-2xl font-bold my-4">History Pesanan</h1>
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
                          <p className="text-white rounded-sm px-2 py-1 text-center bg-green-500">
                            {order.status}
                          </p>
                        </td>
                        <td
                          className="border border-black px-2 py-1 md:px-4 md:py-2"
                          rowSpan={order.items.length}
                        >
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="mr-2 bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded"
                          >
                            Hapus History Pesanan
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
