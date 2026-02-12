import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import type { Color, Size } from "../types/product";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  // Hooks moeten altijd runnen, dus we werken met "safe" defaults
  const images = product ? [product.imageFront, product.imageBack] : [];

  const colors = useMemo(() => {
    if (!product) return [] as Color[];
    return Array.from(new Set(product.variants.map((v) => v.color))) as Color[];
  }, [product]);

  // Init: eerste kleur van product (of fallback)
  const [selectedColor, setSelectedColor] = useState<Color>(() => colors[0] ?? "Black");

  const sizesForColor = useMemo(() => {
    if (!product) return [] as Size[];
    const sizes = product.variants
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size);
    return Array.from(new Set(sizes)) as Size[];
  }, [product, selectedColor]);

  // Init: eerste size die bij die kleur hoort (of fallback)
  const [selectedSize, setSelectedSize] = useState<Size>(() => sizesForColor[0] ?? "M");

  // Init: slideshow start bij 0
  const [activeIndex, setActiveIndex] = useState(0);

  if (!product) return <p className="text-black/70">Product not found.</p>;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const outOfStock = !selectedVariant || selectedVariant.stock <= 0;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-black/50">Product</p>
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-black/10">
            <div className="relative w-full aspect-square">
              {images.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`${product.name} ${idx === 0 ? "Front" : "Back"}`}
                  className={[
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                    idx === activeIndex ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 grid place-items-center transition shadow-sm"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 grid place-items-center transition shadow-sm"
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {images.map((src, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={[
                    "relative rounded-xl overflow-hidden border transition",
                    active ? "border-black" : "border-black/10 hover:border-black/30",
                  ].join(" ")}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img src={src} alt="" className="w-20 h-20 object-cover" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <p className="text-black/70 leading-relaxed">{product.description}</p>

          <div className="text-2xl font-semibold">€ {product.price.toFixed(2)}</div>

          {/* Color */}
          <div>
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => {
                const active = c === selectedColor;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c);
                      // reset size naar eerste beschikbare voor deze kleur
                      const nextSizes = Array.from(
                        new Set(
                          product.variants.filter((v) => v.color === c).map((v) => v.size)
                        )
                      ) as Size[];
                      if (nextSizes[0]) setSelectedSize(nextSizes[0]);
                    }}
                    className={[
                      "px-4 py-2 rounded-full text-sm border transition",
                      active
                        ? "bg-black text-white border-black"
                        : "bg-white text-black/70 border-black/10 hover:border-black/30 hover:text-black",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizesForColor.map((s) => {
                const active = s === selectedSize;
                const variant = product.variants.find(
                  (v) => v.color === selectedColor && v.size === s
                );
                const disabled = !variant || variant.stock <= 0;

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    disabled={disabled}
                    className={[
                      "px-4 py-2 rounded-full text-sm border transition",
                      disabled
                        ? "bg-black/5 text-black/30 border-black/10 cursor-not-allowed"
                        : active
                        ? "bg-black text-white border-black cursor-pointer"
                        : "bg-white text-black/70 border-black/10 hover:border-black/30 hover:text-black cursor-pointer",
                    ].join(" ")}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-sm text-black/50">
              {selectedVariant ? `Stock: ${selectedVariant.stock}` : "No variant found"}
            </p>
          </div>

          <button
  disabled={outOfStock}
  onClick={() => {
    if (!selectedVariant) return;
    addItem({ productId: product.id, variantId: selectedVariant.id }, 1);
  }}
  className={[
    "w-full md:w-auto px-6 py-3 rounded-xl font-medium transition cursor-pointer",
    outOfStock
      ? "bg-black/20 text-black/40 cursor-not-allowed"
      : "bg-black text-white hover:bg-black/80",
  ].join(" ")}
>
  {outOfStock ? "Out of stock" : "Add to cart"}
</button>

          <div className="pt-6 border-t border-black/10 text-sm text-black/60">
            <p>• Free shipping over €100</p>
            <p>• 14-day returns</p>
            <p>• Secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
