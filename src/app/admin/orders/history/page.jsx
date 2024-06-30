"use client";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (querySnapshot) => {
        const ordersList = [];
        querySnapshot.forEach((doc) => {
          const orderData = { id: doc.id, ...doc.data() };
          if (
            orderData.status ===
            "Pesanan Sudah Diambil, dan Sudah Melakukan Pembayaran"
          ) {
            ordersList.push(orderData);
          }
        });
        setOrders(ordersList);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "Tanggal tidak tersedia";
    }
    try {
      const date = timestamp.toDate();
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
    const orderRef = doc(db, "orders", orderId);
    await deleteDoc(orderRef, { status: "Pesanan Dihapus" });
    alert("Pesanan Dihapus");
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
