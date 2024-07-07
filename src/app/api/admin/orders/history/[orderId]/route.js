import { db } from "../../../../../../../firebaseConfig";
import { NextResponse } from "next/server";
import { deleteDoc, doc } from "firebase/firestore";

export async function DELETE(request, { params }) {
  const { orderId } = params;
  const orderRef = doc(db, "orders", orderId);
  await deleteDoc(orderRef);
  return NextResponse.json({ status: 200 });
}
