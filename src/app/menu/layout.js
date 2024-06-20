"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MenuLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    if (!sessionUser) {
      router.push("/");
    } else {
      setUser(sessionUser);
    }
  }, [router]);

  if (!user) {
    return null; // Atau bisa menampilkan loading indicator
  }

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
