"use client";
import { useState, useEffect } from "react";
import { NextResponse } from "next/server";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/orders/history`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/orders/history/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Order deleted successfully");
        window.location.reload();
        return NextResponse.json({ status: 200, message: "Order deleted" });
      } else {
        console.error("Failed to complete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
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
                      <p className="text-white rounded-sm px-2 py-1 text-center bg-green-500">
                        {order.status}
                      </p>
                    </td>
                    <td rowSpan={order.items.length}>
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
  );
}
