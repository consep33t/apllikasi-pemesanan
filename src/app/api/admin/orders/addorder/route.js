import { db } from "../../../../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { user, items, descriptionOrder } = await request.json();
    const docRef = await addDoc(collection(db, "orders"), {
      user,
      items,
      status: "Pesanan Diterima",
      date: new Date(),
      descriptionOrder,
    });

    return new Response(
      JSON.stringify({ message: "Order added", id: docRef.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding order:", error);
    return new Response(JSON.stringify({ message: "Error adding order" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
