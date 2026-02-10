import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Products() {
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-black/60">{products.length} items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}