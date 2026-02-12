import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      <p className="text-sm text-black/60 mb-6">Sign in to view your account.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
        />

        {error && (
          <div className="rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-black/60 mt-6">
        No account yet?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Register
        </Link>
      </p>
    </div>
  );
}
