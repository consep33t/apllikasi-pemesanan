"use client";
import { useState, useEffect } from "react";
import { db } from "../../../../firebaseConfig";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (querySnapshot) => {
        const ordersList = [];
        querySnapshot.forEach((doc) =>
          ordersList.push({ id: doc.id, ...doc.data() })
        );
        setOrders(ordersList);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleComplete = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "Pesanan Selesai, silahkan diambil" });
  };

  const handlePickUp = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: "Pesanan Sudah Diambil, dan Sudah Melakukan Pembayaran",
    });
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

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-center text-2xl font-bold my-4">Pesanan</h1>
      <div className="container mx-auto mt-4">
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
                          {new Date(order.date).toLocaleDateString()}
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
