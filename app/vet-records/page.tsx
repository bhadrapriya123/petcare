"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import VetRecordForm, { VetRecordFormData } from "@/components/forms/VetRecordForm";

type Pet = {
  id: string;
  name: string;
};

type VetRecord = {
  id: string;
  vet_name: string;
  visit_date: string;
  reason: string | null;
  notes: string | null;
  pets: { name: string } | null;
};

export default function VetRecordsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [records, setRecords] = useState<VetRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchData = async () => {
    const { data: petsData } = await supabase.from("pets").select("id, name");
    if (petsData) setPets(petsData);

    const { data: recordsData } = await supabase
      .from("vet_records")
      .select("*, pets(name)")
      .order("visit_date", { ascending: false });

    if (recordsData) setRecords(recordsData as VetRecord[]);

    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRecord = async (formData: VetRecordFormData) => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    await supabase.from("vet_records").insert([
      {
        user_id: user.id,
        pet_id: formData.pet_id,
        vet_name: formData.vet_name,
        visit_date: formData.visit_date,
        reason: formData.reason || null,
        notes: formData.notes || null,
      },
    ]);

    setLoading(false);
    fetchData();
  };

  if (pageLoading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Vet Records</h1>

      <VetRecordForm pets={pets} onSubmit={handleAddRecord} loading={loading} />

      {records.length === 0 && <p className="text-gray-500">No vet records yet.</p>}

      {records.map((record) => (
        <div key={record.id} className="bg-gray-100 p-3 rounded-lg mb-2">
          <p className="font-bold">{record.pets?.name} — {record.vet_name}</p>
          <p className="text-sm text-gray-600">Visit: {record.visit_date}</p>
          {record.reason && <p className="text-sm text-gray-600">Reason: {record.reason}</p>}
          {record.notes && <p className="text-sm text-gray-500">{record.notes}</p>}
        </div>
      ))}
    </div>
  );
}