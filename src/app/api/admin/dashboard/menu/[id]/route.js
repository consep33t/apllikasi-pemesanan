import { NextResponse } from "next/server";
import { db } from "../../../../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Endpoint untuk mengambil item menu berdasarkan ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, "menu", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({
        status: 200,
        data: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      return NextResponse.json({ status: 404, message: "Menu item not found" });
    }
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
