/*Dit component is verantwoordelijk voor:

1 product tonen

Met:

Afbeelding (voor/achter met hover)

Naam

Prijs

En het is klikbaar → gaat naar de product detail pagina

Dus:

1 product in je data = 1 ProductCard op het scherm */


import type { Product } from "../types/product";
import { Link } from "react-router-dom";

//Dit component verwacht 1 prop: product( id, imageFront, imageBack, name, price, description ), en dat moet van type Product zijn. krijgt hij van de parent component (Home)
type Props = {
  product: Product;
};


/*Je krijgt props
En je haalt daar meteen product uit
Dus je kunt direct product.name, product.price, etc. gebruiken */
export default function ProductCard({ product }: Props) {
  return (

    // Link naar de product detail pagina voor dit specifieke product hele kaart is klikbaar
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition border border-black/10"
    >
      <div className="relative w-full aspect-square">
        {/* Twee afbeeldingen op elkaar, en met hover effect wisselen we welke zichtbaar is */}
        {/* Front image */}
        <img
          src={product.imageFront}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Back image */}
        <img
          src={product.imageBack}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="p-4">
        {/* Naam en prijs van het product */}
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-black/70">€ {product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}