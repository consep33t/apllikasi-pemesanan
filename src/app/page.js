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
      await addDoc(collection(db, "users"), { name, phone });
    }

    sessionStorage.setItem("user", JSON.stringify({ name, phone }));
    router.push("/menu");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-bg-login bg-cover bg-center bg-no-repeat">
      <h1 className="text-3xl font-bold mb-52 uppercase font-mono text-slate-100">
        Selamat datang di aplikasi pemesanan nasi goreng cak lontong
      </h1>
      <form
        className="flex flex-col rounded w-1/2 p-10 justify-around h-96 backdrop-brightness-50 backdrop-blur-sm font-mono"
        onSubmit={handleSubmit}
      >
        <div className="text-center font-bold text-xl mb-5 text-slate-200">
          <h2>Masukkan data diri anda untuk melihat menu</h2>
        </div>
        <label className="text-slate-200 text-lg" htmlFor="name">
          Nama
        </label>
        <input
          className="px-4 py-2 border rounded"
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
          className="px-4 py-2 border rounded"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nomor Handphone"
          required
        />
        <button
          className="bg-[#B11824] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
