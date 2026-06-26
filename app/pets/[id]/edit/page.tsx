"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<PetFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setInitialData({
          name: data.name || "",
          type: data.type || "",
          breed: data.breed || "",
          age: data.age?.toString() || "",
          weight: data.weight?.toString() || "",
          gender: data.gender || "",
          medical_notes: data.medical_notes || "",
        });
      }
    };

    fetchPet();
  }, [id]);

  const handleUpdatePet = async (formData: PetFormData) => {
    setError("");
    setLoading(true);

    const { error } = await supabase
      .from("pets")
      .update({
        name: formData.name,
        type: formData.type,
        breed: formData.breed || null,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        gender: formData.gender || null,
        medical_notes: formData.medical_notes || null,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/pets/${id}`);
  };

  if (!initialData) return <p className="p-8">Loading pet data...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Pet</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <PetForm
          initialData={initialData}
          onSubmit={handleUpdatePet}
          loading={loading}
        />
      </div>
    </div>
  );
}