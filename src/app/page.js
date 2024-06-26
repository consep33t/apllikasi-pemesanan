// app/page.js
"use client";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "users"),
      where("name", "==", name),
      where("phone", "==", phone)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(collection(db, "users"), {
        name,
        phone,
        role: "customers",
      });
      sessionStorage.setItem(
        "user",
        JSON.stringify({ name, phone, role: "customers" })
      );
    } else {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const { role } = userData;
        sessionStorage.setItem("user", JSON.stringify({ name, phone, role }));
      });
    }

    router.push("/menu");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-bg-login bg-cover bg-center bg-no-repeat p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-10 uppercase px-3 py-1 rounded-sm text-center text-slate-100 backdrop-brightness-50 backdrop-blur-sm font-mono">
        Selamat datang di aplikasi pemesanan nasi goreng cak lontong
      </h1>
      <form
        className="flex flex-col rounded w-full sm:w-3/4 md:w-1/2 p-4 sm:p-6 md:p-10 justify-around backdrop-brightness-50 backdrop-blur-sm font-mono"
        onSubmit={handleSubmit}
      >
        <div className="text-center font-bold text-xl mb-5 text-slate-200">
          <h2>Masukkan data diri anda untuk melihat menu</h2>
        </div>
        <label className="text-slate-200 text-lg" htmlFor="name">
          Nama
        </label>
        <input
          className="px-4 py-2 border rounded mb-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          required
        />
        <label className="text-slate-200 text-lg" htmlFor="phone">
          Nomor Handphone
        </label>
        <input
          className="px-4 py-2 border rounded mb-6"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nomor Handphone"
          required
        />
        <button
          className="bg-[#ec4755] hover:bg-[#B11824] text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
