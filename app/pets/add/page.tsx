"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PetForm from "@/components/forms/PetForm";

type PetFormData = {
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  medical_notes: string;
};

export default function AddPetPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddPet = async (formData: PetFormData) => {
    setError("");
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to add a pet.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("pets").insert([
      {
        user_id: user.id,
        name: formData.name,
        type: formData.type,
        breed: formData.breed || null,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        gender: formData.gender || null,
        medical_notes: formData.medical_notes || null,
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/pets");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Pet</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <PetForm onSubmit={handleAddPet} loading={loading} />
      </div>
    </div>
  );
}