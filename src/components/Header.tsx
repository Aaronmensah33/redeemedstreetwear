import { NavLink, Link } from "react-router-dom";
import { FaMoon, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo-mark.png";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? "text-black" : "text-black/70 hover:text-black"
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* Left: logo */}
        <Link to="/" className="flex items-center gap-3 ">
          <img src={logo} alt="Redeemed" className="h-20 w-20 cursor-pointer hover:[animation:spin-2d-slow_12s_linear_infinite]" />
        </Link>

        {/* Middle: nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>

        {/* Right: icons */}
        <div className="flex items-center gap-4 text-black">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-black/5 transition"
            aria-label="Toggle theme"
          >
            <FaMoon className="h-5 w-5" />
          </button>

          <Link
            to="/cart"
            className="p-2 rounded-lg hover:bg-black/5 transition"
            aria-label="Cart"
          >
            <FaShoppingCart className="h-5 w-5" />
          </Link>

          <button
            type="button"
            className="p-2 rounded-lg hover:bg-black/5 transition"
            aria-label="Account"
          >
            <FaUser className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}