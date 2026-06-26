"use client";

import { useState } from "react";

type Pet = {
  id: string;
  name: string;
};

export type ReminderFormData = {
  pet_id: string;
  title: string;
  type: string;
  due_date: string;
  notes: string;
};

type ReminderFormProps = {
  pets: Pet[];
  onSubmit: (data: ReminderFormData) => Promise<void>;
  loading: boolean;
};

export default function ReminderForm({ pets, onSubmit, loading }: ReminderFormProps) {
  const [petId, setPetId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ pet_id: petId, title, type, due_date: dueDate, notes });
    setTitle("");
    setType("");
    setDueDate("");
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
        placeholder="Title (e.g. Vaccine due)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Type (e.g. Vaccine, Vet Visit)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
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
        {loading ? "Adding..." : "Add Reminder"}
      </button>
    </form>
  );
}