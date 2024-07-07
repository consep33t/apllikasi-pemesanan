import { db, storage } from "../../../../../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(request) {
  try {
    const { name, price, description, imageName, imageData, type } =
      await request.json();

    const storageRef = ref(storage, `menuImages/${imageName}`);
    await uploadBytes(storageRef, Buffer.from(imageData, "base64"));
    const imageUrl = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, "menu"), {
      name,
      price: parseFloat(price),
      description,
      imageUrl,
      type,
    });

    return new Response(
      JSON.stringify({ message: "Menu added", id: docRef.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding menu:", error);
    return new Response(JSON.stringify({ message: "Error adding menu" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
