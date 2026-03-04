import PasswordGate from "../components/PasswordGate";
import AdminDashboard from "../components/AdminDashboard";
import Navbar from "../components/Navbar";

export default function Admin() {
  return (
    <PasswordGate
      heading="Admin Access"
      subheading="Private dashboard access."
      storageKey="pd26_admin_access"
      password={import.meta.env.VITE_PD26_ADMIN_PASSWORD}
    >
      <>
        <Navbar />
        <AdminDashboard />
      </>
    </PasswordGate>
  );
}