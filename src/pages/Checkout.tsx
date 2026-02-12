import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();

  const lines = useMemo(() => {
    return items
      .map((ci) => {
        const product = products.find((p) => p.id === ci.productId);
        const variant = product?.variants.find((v) => v.id === ci.variantId);
        if (!product || !variant) return null;

        return {
          ...ci,
          product,
          variant,
          lineTotal: product.price * ci.quantity,
        };
      })
      .filter(Boolean) as Array<{
      productId: string;
      variantId: string;
      quantity: number;
      product: (typeof products)[number];
      variant: (typeof products)[number]["variants"][number];
      lineTotal: number;
    }>;
  }, [items]);

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const shipping = subtotal >= 100 ? 0 : subtotal === 0 ? 0 : 6.95;
  const total = subtotal + shipping;

  const [form, setForm] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Netherlands",
  });

  const onChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const canSubmit =
    lines.length > 0 &&
    form.email.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.postalCode.trim();

  const placeOrder = () => {
  if (!canSubmit) return;

  const orderId = `RD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  clear();

  navigate("/success", {
    state: {
      orderId,
      total,
      email: form.email,
    },
    replace: true,
  });
};

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-black/70">Your cart is empty.</p>
        <Link to="/products" className="underline underline-offset-4">
          Continue shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Link to="/cart" className="text-sm underline underline-offset-4 text-black/70 hover:text-black">
          Edit cart
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        {/* LEFT: Form */}
        <div className="rounded-2xl border border-black/10 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="text-sm text-black/60">We’ll send order updates to this email.</p>
          </div>

          <div className="grid gap-3">
            <input
              value={form.email}
              onChange={onChange("email")}
              placeholder="Email"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Shipping address</h2>
            <p className="text-sm text-black/60">Enter your shipping details.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input
              value={form.firstName}
              onChange={onChange("firstName")}
              placeholder="First name"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
            <input
              value={form.lastName}
              onChange={onChange("lastName")}
              placeholder="Last name"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input
              value={form.phone}
              onChange={onChange("phone")}
              placeholder="Phone (optional)"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
            <input
              value={form.country}
              onChange={onChange("country")}
              placeholder="Country"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
          </div>

          <div className="grid gap-3">
            <input
              value={form.address}
              onChange={onChange("address")}
              placeholder="Address"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input
              value={form.city}
              onChange={onChange("city")}
              placeholder="City"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
            <input
              value={form.postalCode}
              onChange={onChange("postalCode")}
              placeholder="Postal code"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/30"
            />
          </div>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={placeOrder}
            className={[
              "w-full px-6 py-3 rounded-xl font-medium transition",
              canSubmit
                ? "bg-black text-white hover:bg-black/90"
                : "bg-black/20 text-black/40 cursor-not-allowed",
            ].join(" ")}
          >
            Place order
          </button>

          <p className="text-xs text-black/50">
            Demo checkout — later koppelen we dit aan je backend (orders + payments).
          </p>
        </div>

        {/* RIGHT: Summary */}
        <aside className="rounded-2xl border border-black/10 p-6 space-y-5">
          <h2 className="text-lg font-semibold">Order summary</h2>

          <div className="space-y-4">
            {lines.map((l) => (
              <div key={`${l.productId}:${l.variantId}`} className="flex gap-3">
                <img
                  src={l.product.imageFront}
                  alt={l.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-black/5"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{l.product.name}</p>
                  <p className="text-xs text-black/60">
                    {l.variant.color} • {l.variant.size} • Qty {l.quantity}
                  </p>
                </div>
                <div className="text-sm font-semibold">€ {l.lineTotal.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-black/70">Subtotal</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">Shipping</span>
              <span>{shipping === 0 ? "Free" : `€ ${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2">
              <span>Total</span>
              <span>€ {total.toFixed(2)}</span>
            </div>

            {subtotal > 0 && subtotal < 100 && (
              <p className="text-xs text-black/50 pt-2">
                Add € {(100 - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
