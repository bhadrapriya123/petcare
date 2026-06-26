import Link from "next/link";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  age: number | null;
};

type PetCardProps = {
  pet: Pet;
};

export default function PetCard({ pet }: PetCardProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{pet.name}</h2>
      <p className="text-gray-600">
        {pet.type}
        {pet.breed ? ` • ${pet.breed}` : ""}
      </p>
      {pet.age !== null && (
        <p className="text-gray-500 text-sm">{pet.age} years old</p>
      )}

      <div className="flex gap-2 mt-3">
        <Link
          href={`/pets/${pet.id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          View
        </Link>
        <Link
          href={`/pets/${pet.id}/edit`}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}