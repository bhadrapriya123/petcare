"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <span className="font-bold text-lg">🐾 PetCare</span>

      <div className="flex gap-4 items-center text-sm">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/pets" className="hover:underline">Pets</Link>
        <Link href="/tracker" className="hover:underline">Tracker</Link>
        <Link href="/reminders" className="hover:underline">Reminders</Link>
        <Link href="/vet-records" className="hover:underline">Vet Records</Link>
        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}