import { useEffect, useState } from "react";

type Stats = {
  total: number;
  traditionalYes: number;
  whiteYes: number;
  livestream: number;
  family: number;
  friends: number;
  church: number;
  campus: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("YOUR_SCRIPT_URL?action=stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1>RSVP Dashboard</h1>

      <div className="stats-grid">
        <Stat label="Total RSVPs" value={stats.total} />
        <Stat label="Traditional Wedding" value={stats.traditionalYes} />
        <Stat label="White Wedding" value={stats.whiteYes} />
        <Stat label="Livestream" value={stats.livestream} />

        <Stat label="Family" value={stats.family} />
        <Stat label="Friends" value={stats.friends} />
        <Stat label="Church Ministry" value={stats.church} />
        <Stat label="Campus Ministry" value={stats.campus} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}