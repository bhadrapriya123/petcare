"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DashboardStats from "@/components/DashboardStats";
import PetCard from "@/components/PetCard";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  age: number | null;
};

type Reminder = {
  id: string;
  title: string;
  due_date: string;
  pets: { name: string }[] | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [todaysLogsCount, setTodaysLogsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: petsData } = await supabase.from("pets").select("*");
      if (petsData) setPets(petsData);

      const { data: remindersData } = await supabase
        .from("reminders")
        .select("id, title, due_date, pets(name)")
        .eq("status", "pending")
        .order("due_date", { ascending: true })
        .limit(5);

      if (remindersData) setReminders(remindersData as Reminder[]);

      const { count: pendingTotal } = await supabase
        .from("reminders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      setPendingCount(pendingTotal || 0);

      const today = new Date().toISOString().split("T")[0];
      const { count: logsToday } = await supabase
        .from("daily_logs")
        .select("*", { count: "exact", head: true })
        .eq("log_date", today);

      setTodaysLogsCount(logsToday || 0);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <p className="p-8">Loading dashboard...</p>;

 return (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Welcome back 👋</h1>
      <DashboardStats
        totalPets={pets.length}
        pendingReminders={pendingCount}
        todaysLogs={todaysLogsCount}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-3">Recent Reminders</h2>
          {reminders.length === 0 && <p className="text-gray-500">No pending reminders.</p>}
          {reminders.map((r) => (
            <div key={r.id} className="bg-gray-100 p-3 rounded-lg mb-2">
              <p className="font-semibold">{r.title}</p>
              <p className="text-sm text-gray-600">{r.pets?.[0]?.name} • Due: {r.due_date}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">My Pets</h2>
          {pets.length === 0 && <p className="text-gray-500">No pets yet.</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}