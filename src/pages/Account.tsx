import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Account</h1>
      <p className="text-black/70">Logged in as: <span className="font-medium">{user?.email}</span></p>

      <button
        onClick={logout}
        className="px-5 py-3 rounded-xl border border-black/10 hover:border-black/30 transition"
      >
        Logout
      </button>
    </div>
  );
}
