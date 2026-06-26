type DashboardStatsProps = {
  totalPets: number;
  pendingReminders: number;
  todaysLogs: number;
};

export default function DashboardStats({ totalPets, pendingReminders, todaysLogs }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold">{totalPets}</p>
        <p className="text-sm text-gray-600">Total Pets</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold">{pendingReminders}</p>
        <p className="text-sm text-gray-600">Pending Reminders</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <p className="text-2xl font-bold">{todaysLogs}</p>
        <p className="text-sm text-gray-600">Today's Logs</p>
      </div>
    </div>
  );
}