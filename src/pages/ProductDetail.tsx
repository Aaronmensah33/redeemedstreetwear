import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  // ✅ Hooks altijd bovenaan, nooit na een return/if
  const [activeIndex, setActiveIndex] = useState(0);

  // Zoek product (kan undefined zijn)
  const product = products.find((p) => p.id === id);


  // ✅ Hier pas conditioneel renderen
  if (!product) {
    return <p>Product not found.</p>;
  }

  const images = [product.imageFront, product.imageBack];

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Slideshow */}
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-white/5">
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

            {/* Controls */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 grid place-items-center transition"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 grid place-items-center transition"
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 justify-center">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={[
                  "h-2.5 rounded-full transition",
                  idx === activeIndex
                    ? "w-6 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/60",
                ].join(" ")}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-white/70 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-6">
            € {product.price.toFixed(2)}
          </p>

          <button className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
