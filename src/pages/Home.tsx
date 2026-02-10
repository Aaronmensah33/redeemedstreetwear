/*Dit is je homepage.
Zijn taak is:

De lijst met producten pakken

En voor elk product een ProductCard laten zien

In een grid layout 

home gaat naar App.tsx, dat bepaalt dat dit de pagina is voor de / route.
*/

import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

// pas deze imports aan naar jouw bestandsnamen
// import bigLogo from "../assets/brand/logo-big.png";
import heroImg from "../assets/brand/hero.jpg";
import Spline from "@splinetool/react-spline";
import bigLogo2D from "../assets/brand/text-rond.png";


export default function Home() {
  const latest = products.slice(0, 3);

  return (
    <div className="space-y-14">
      {/* HERO */}
      <section className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        {/* Left: Hero banner met background image */}
        <div className="relative overflow-hidden rounded-3xl min-h-[260px] md:min-h-[320px]">
          {/* Background image */}
          <img
            src={heroImg} // of jouw image variabele
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Donkere overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

          {/* Text overlay */}
          <div className="relative z-10 p-6 md:p-8 max-w-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
              Lorem ipsum
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500's.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Right: Big rotating logo */}
       {/* Right: Logo (2D op mobile, 3D op desktop) */}
<div className="flex justify-center md:justify-end">
  {/* 2D logo: zichtbaar op mobile */}
  <img
    src={bigLogo2D}
    alt="Redeemed logo"
    className="block md:hidden w-56 select-none animate-spin-2d-slow"
  />

  {/* 3D logo (Spline): zichtbaar vanaf md */}
  <div className="hidden md:block w-64 h-64 md:w-80 md:h-80 pointer-events-none">
    <Spline scene="https://prod.spline.design/Hp5LCmtLiI1cf42m/scene.splinecode" />
  </div>
</div>
      </section>

      {/* LATEST DROPS */}
      <section>
        <h3 className="text-center  text-2xl font-semibold tracking-wide text-black/70 mb-6">
          Latest drops
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/products"
            className="text-sm font-medium underline underline-offset-4 hover:text-black/70 transition"
          >
            view more →
          </Link>
        </div>
      </section>
    </div>
  );
}
