"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PetCard from "@/components/PetCard";
import Link from "next/link";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  age: number | null;
};

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPets(data);
      }
      setLoading(false);
    };

    fetchPets();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <Link
          href="/pets/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Pet
        </Link>
      </div>

      {loading && <p>Loading pets...</p>}

      {!loading && pets.length === 0 && (
        <p className="text-gray-500">No pets yet. Add your first one!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}