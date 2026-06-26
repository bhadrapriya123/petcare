"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  age: number | null;
  weight: number | null;
  gender: string | null;
  medical_notes: string | null;
};

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setPet(data);
      }
      setLoading(false);
    };

    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this pet?");
    if (!confirmed) return;

    await supabase.from("pets").delete().eq("id", id);
    router.push("/pets");
  };

  if (loading) return <p className="p-8">Loading pet...</p>;
  if (!pet) return <p className="p-8">Pet not found.</p>;

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-2">{pet.name}</h1>
      <p className="text-gray-600 mb-1">{pet.type} {pet.breed ? `• ${pet.breed}` : ""}</p>
      {pet.age !== null && <p className="text-gray-600 mb-1">Age: {pet.age} years</p>}
      {pet.weight !== null && <p className="text-gray-600 mb-1">Weight: {pet.weight} kg</p>}
      {pet.gender && <p className="text-gray-600 mb-1">Gender: {pet.gender}</p>}
      {pet.medical_notes && (
        <p className="text-gray-600 mt-3">
          <span className="font-semibold">Medical Notes:</span> {pet.medical_notes}
        </p>
      )}

      <div className="flex gap-2 mt-6">
        <Link
          href={`/pets/${pet.id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <Link
          href="/pets"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}