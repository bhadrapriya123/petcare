"use client";

import { useState } from "react";

type Pet = {
  id: string;
  name: string;
};

export type VetRecordFormData = {
  pet_id: string;
  vet_name: string;
  visit_date: string;
  reason: string;
  notes: string;
};

type VetRecordFormProps = {
  pets: Pet[];
  onSubmit: (data: VetRecordFormData) => Promise<void>;
  loading: boolean;
};

export default function VetRecordForm({ pets, onSubmit, loading }: VetRecordFormProps) {
  const [petId, setPetId] = useState("");
  const [vetName, setVetName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ pet_id: petId, vet_name: vetName, visit_date: visitDate, reason, notes });
    setVetName("");
    setVisitDate("");
    setReason("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-6">
      <select
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      >
        <option value="">Select Pet</option>
        {pets.map((pet) => (
          <option key={pet.id} value={pet.id}>{pet.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Vet Name"
        value={vetName}
        onChange={(e) => setVetName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="date"
        value={visitDate}
        onChange={(e) => setVisitDate(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Reason for visit"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white w-full p-2 rounded"
      >
        {loading ? "Adding..." : "Add Vet Record"}
      </button>
    </form>
  );
}