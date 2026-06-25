"use client";

import { useState } from "react";

type PetFormData = {
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  medical_notes: string;
};

type PetFormProps = {
  initialData?: PetFormData;
  onSubmit: (data: PetFormData) => Promise<void>;
  loading?: boolean;
};

export default function PetForm({ initialData, onSubmit, loading }: PetFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState(initialData?.type || "");
  const [breed, setBreed] = useState(initialData?.breed || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [weight, setWeight] = useState(initialData?.weight || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [medicalNotes, setMedicalNotes] = useState(initialData?.medical_notes || "");

  return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit({
        name,
        type,
        breed,
        age,
        weight,
        gender,
        medical_notes: medicalNotes,
      });
    }}
    className="bg-white-100 p-6 rounded-lg shadow-md w-full max-w-md"
  >
    <input
      type="text"
      placeholder="Pet Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border p-2 w-full mb-3 rounded"
      required
    />

    <input
      type="text"
      placeholder="Type (e.g. Dog, Cat)"
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 w-full mb-3 rounded"
      required
    />

    <input
      type="text"
      placeholder="Breed"
      value={breed}
      onChange={(e) => setBreed(e.target.value)}
      className="border p-2 w-full mb-3 rounded"
    />

    <input
      type="number"
      placeholder="Age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      className="border p-2 w-full mb-3 rounded"
    />

    <div className="flex items-center gap-2 mb-3">
  <input
    type="number"
    placeholder="Weight"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    className="border p-2 w-full rounded"
  />
  <span className="text-white-600">kg</span>
</div>

    <input
      type="text"
      placeholder="Gender"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="border p-2 w-full mb-3 rounded"
    />

    <textarea
      placeholder="Medical Notes"
      value={medicalNotes}
      onChange={(e) => setMedicalNotes(e.target.value)}
      className="border p-2 w-full mb-3 rounded"
    />

    <button
      type="submit"
      disabled={loading}
      className="bg-green-600 text-white w-full p-2 rounded"
    >
      {loading ? "Saving..." : "Save Pet"}
    </button>
  </form>
);
}