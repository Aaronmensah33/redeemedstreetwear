/* App.tsx is:

Je layout (header, achtergrond, margins, etc.)

Je navigatie/menu

En de plek waar je bepaalt welke pagina wordt getoond met routes

Alles wat de gebruiker ziet, loopt via dit bestand. 

dit gaat naar main.tsx, dat rendert deze App component in het root element van index.html.
*/


import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function App() {
  /* NavLink geeft automatisch een object met { isActive }
  Als de link de huidige pagina is → isActive = true
  Deze functie:
  Bouwt een string met Tailwind classes

  Als actief:
  Witte achtergrond
  Zwarte tekst

  Anders:
  Lichtere witte tekst
  Hover effect
  */

  return (
    // De hele pagina
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">

          {/* Routes bepalen welke pagina getoond wordt 
          als je naar / gaat toon Home component
          als je naar /products gaat toon Products component
          etc.
          */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          {/* :id = dynamisch stuk, kan van alles zijn, in Product pagina kunnen we dat id gebruiken om te weten welk product we moeten tonen */}
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        {/*Alleen dit <main> stuk wisselt */}
      </main>
    </div>
  );
}

export default App;
//Zodat main.tsx dit component kan renderen.