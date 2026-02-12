import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function Cart() {
  const { items, removeItem, setQuantity } = useCart();

  const lines = items
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

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Cart</h1>
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
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="text-sm text-black/60">{items.length} item types</p>
      </div>

      <div className="space-y-4">
        {lines.map((l) => (
          <div
            key={`${l.productId}:${l.variantId}`}
            className="flex gap-4 items-center rounded-2xl border border-black/10 p-4"
          >
            <img
              src={l.product.imageFront}
              alt={l.product.name}
              className="w-20 h-20 rounded-xl object-cover bg-black/5"
            />

            <div className="flex-1">
              <p className="font-semibold">{l.product.name}</p>
              <p className="text-sm text-black/60">
                {l.variant.color} • {l.variant.size}
              </p>
              <p className="text-sm font-medium mt-1">€ {l.product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 rounded-lg border border-black/10 hover:border-black/30 transition"
                onClick={() => setQuantity(l.productId, l.variantId, l.quantity - 1)}
              >
                −
              </button>
              <span className="w-8 text-center">{l.quantity}</span>
              <button
                className="w-9 h-9 rounded-lg border border-black/10 hover:border-black/30 transition"
                onClick={() => setQuantity(l.productId, l.variantId, l.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="w-28 text-right font-semibold">
              € {l.lineTotal.toFixed(2)}
            </div>

            <button
              className="text-sm underline underline-offset-4 text-black/70 hover:text-black"
              onClick={() => removeItem(l.productId, l.variantId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-black/10 pt-6">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold">€ {total.toFixed(2)}</p>
      </div>

      <div className="flex justify-end">
        <Link
          to="/checkout"
          className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition"
        >
          Checkout →
        </Link>
      </div>
    </div>
  );
}
