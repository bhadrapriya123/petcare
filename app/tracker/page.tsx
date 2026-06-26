"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import TrackerCard, { TrackerData } from "@/components/TrackerCard";

type Pet = {
  id: string;
  name: string;
};

export default function TrackerPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase.from("pets").select("id, name");
      if (!error && data) {
        setPets(data);
      }
      setLoading(false);
    };

    fetchPets();
  }, []);

  const handleSaveLog = async (petId: string, trackerData: TrackerData) => {
    setSavingId(petId);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("daily_logs").upsert(
      {
        user_id: user.id,
        pet_id: petId,
        log_date: today,
        ...trackerData,
      },
      { onConflict: "pet_id,log_date" }
    );

    setSavingId(null);

    if (error) {
      setMessage("Error saving log: " + error.message);
    } else {
      setMessage("Saved!");
    }
  };

  if (loading) return <p className="p-8">Loading pets...</p>;

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Daily Tracker</h1>
      {message && <p className="text-green-600 mb-3">{message}</p>}

      {pets.length === 0 && <p className="text-gray-500">No pets yet.</p>}

      {pets.map((pet) => (
        <TrackerCard
          key={pet.id}
          petId={pet.id}
          petName={pet.name}
          onSave={handleSaveLog}
          saving={savingId === pet.id}
        />
      ))}
    </div>
  );
}