import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo-mark.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


export default function Header() {

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-black"
        : "text-black/70 hover:text-black/90"
    }`;

  
  const { totalItems } = useCart();
  const { isAuthed } = useAuth();


  
  return (
    <header className="sticky top-0 z-50 bg-white/80  backdrop-blur-md shadow-sm border-b border-black/10 ">
      
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
        <div className="flex items-center gap-4 text-black ">

          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-black/5  transition" aria-label="Cart">
  <FaShoppingCart className="h-5 w-5" />
  {totalItems > 0 && (
    <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full min-w-5 h-5 px-1 grid place-items-center">
      {totalItems}
    </span>
  )}
</Link>


          <Link
  to={isAuthed ? "/account" : "/login"}
  className="p-2 rounded-lg hover:bg-black/5 transition"
  aria-label="Account"
>
  <FaUser className="h-5 w-5" />
</Link>
        </div>
      </div>
    </header>
  );
}