import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import type { ProductCategory } from "../types/product";

const FILTERS: { label: string; value: "all" | ProductCategory }[] = [
  { label: "All", value: "all" },
  { label: "Jackets", value: "jacket" },
  { label: "Hoodies", value: "hoodie" },
  { label: "Shirts", value: "shirt" },
  { label: "Pants", value: "pants" },
  { label: "Vests", value: "vest" },
];

export default function Products() {

  const [selected, setSelected] = useState<"all" | ProductCategory>("all");

  const filteredProducts = useMemo(() => {
    if (selected === "all") return products;
    return products.filter((p) => p.category === selected);
  }, [selected]);

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-black/60">
            {filteredProducts.length} of {products.length} items
          </p>
      </div>

      {/* Filter UI */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => {
          const active = f.value === selected;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setSelected(f.value)}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium border transition",
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/70 border-black/10 hover:border-black/20 hover:text-black",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}