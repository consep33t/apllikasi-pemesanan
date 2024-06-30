import { NextResponse } from "next/server";
import { db } from "../../../../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "menu"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ status: 200, data: items });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
