"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ReminderForm, { ReminderFormData } from "@/components/forms/ReminderForm";

type Pet = {
  id: string;
  name: string;
};

type Reminder = {
  id: string;
  title: string;
  type: string;
  due_date: string;
  status: string;
  notes: string | null;
  pets: { name: string } | null;
};

export default function RemindersPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchData = async () => {
    const { data: petsData } = await supabase.from("pets").select("id, name");
    if (petsData) setPets(petsData);

    const { data: remindersData } = await supabase
      .from("reminders")
      .select("*, pets(name)")
      .order("due_date", { ascending: true });

    if (remindersData) setReminders(remindersData as Reminder[]);

    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddReminder = async (formData: ReminderFormData) => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    await supabase.from("reminders").insert([
      {
        user_id: user.id,
        pet_id: formData.pet_id,
        title: formData.title,
        type: formData.type,
        due_date: formData.due_date,
        notes: formData.notes || null,
      },
    ]);

    setLoading(false);
    fetchData();
  };

  if (pageLoading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>

      <ReminderForm pets={pets} onSubmit={handleAddReminder} loading={loading} />

      {reminders.length === 0 && <p className="text-gray-500">No reminders yet.</p>}

      {reminders.map((reminder) => (
        <div key={reminder.id} className="bg-gray-100 p-3 rounded-lg mb-2">
          <p className="font-bold">{reminder.title}</p>
          <p className="text-sm text-gray-600">
            {reminder.pets?.name} • {reminder.type} • Due: {reminder.due_date}
          </p>
          {reminder.notes && <p className="text-sm text-gray-500">{reminder.notes}</p>}
          <span className="text-xs bg-yellow-200 px-2 py-1 rounded">{reminder.status}</span>
        </div>
      ))}
    </div>
  );
}