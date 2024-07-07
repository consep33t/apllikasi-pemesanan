import { NextResponse } from "next/server";
import { db } from "../../../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export async function GET() {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, "orders"),
        (querySnapshot) => {
          const ordersList = [];
          querySnapshot.forEach((doc) => {
            const orderData = { id: doc.id, ...doc.data() };
            if (
              orderData.status !==
              "Pesanan Sudah Diambil, dan Sudah Melakukan Pembayaran"
            ) {
              ordersList.push(orderData);
            }
          });
          resolve(
            NextResponse.json({
              status: 200,
              dataLength: ordersList.length,
              data: ordersList,
            })
          );
        }
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
      reject(
        NextResponse.json({ status: 500, message: "Internal Server Error" })
      );
    }
  });
}
