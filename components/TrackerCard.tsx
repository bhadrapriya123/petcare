"use client";

import { useState } from "react";

type TrackerCardProps = {
  petId: string;
  petName: string;
  onSave: (petId: string, data: TrackerData) => Promise<void>;
  saving: boolean;
};

export type TrackerData = {
  food_done: boolean;
  water_done: boolean;
  walk_done: boolean;
  medicine_done: boolean;
  grooming_done: boolean;
  notes: string;
};

export default function TrackerCard({ petId, petName, onSave, saving }: TrackerCardProps) {
  const [food, setFood] = useState(false);
  const [water, setWater] = useState(false);
  const [walk, setWalk] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [grooming, setGrooming] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="font-bold mb-2">{petName}</h2>

      <label className="flex items-center gap-2 mb-1">
        <input type="checkbox" checked={food} onChange={(e) => setFood(e.target.checked)} />
        Food
      </label>

      <label className="flex items-center gap-2 mb-1">
        <input type="checkbox" checked={water} onChange={(e) => setWater(e.target.checked)} />
        Water
      </label>

      <label className="flex items-center gap-2 mb-1">
        <input type="checkbox" checked={walk} onChange={(e) => setWalk(e.target.checked)} />
        Walk
      </label>

      <label className="flex items-center gap-2 mb-1">
        <input type="checkbox" checked={medicine} onChange={(e) => setMedicine(e.target.checked)} />
        Medicine
      </label>

      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={grooming} onChange={(e) => setGrooming(e.target.checked)} />
        Grooming
      </label>

      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <button
        disabled={saving}
        onClick={() =>
          onSave(petId, {
            food_done: food,
            water_done: water,
            walk_done: walk,
            medicine_done: medicine,
            grooming_done: grooming,
            notes,
          })
        }
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}