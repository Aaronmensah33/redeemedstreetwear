import { Link, useLocation, Navigate } from "react-router-dom";

type OrderSummary = {
  orderId: string;
  total: number;
  email: string;
};

export default function Success() {
  const location = useLocation();
  const state = location.state as OrderSummary | undefined;

  // Als iemand direct naar /success gaat zonder order
  if (!state) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="rounded-2xl border border-black/10 p-8">
        <p className="text-sm text-black/60">Order confirmed</p>
        <h1 className="text-3xl font-bold mt-1">Thank you! ✅</h1>

        <p className="text-black/70 mt-3">
          We’ve received your order. A confirmation email will be sent to{" "}
          <span className="font-medium text-black">{state.email}</span>.
        </p>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-black/60">Order ID</span>
            <span className="font-medium">{state.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black/60">Total paid</span>
            <span className="font-medium">€ {state.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to="/products"
            className="px-5 py-3 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="px-5 py-3 rounded-xl border border-black/10 font-medium hover:border-black/30 transition"
          >
            Back to home
          </Link>
        </div>
      </div>

      <p className="text-xs text-black/50">
        Demo flow — later koppelen we dit aan je backend (orders + payments + email).
      </p>
    </div>
  );
}
