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
import Footer from "./components/Footer";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import TestPage from "./pages/Oefeningen/TestPage";

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
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        {/* mx-auto max-w-6xl px-6 py-8 */}
<div className="mx-auto max-w-6xl px-6 py-8">
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
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
<Route
  path="/account"
  element={
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  }
/>
<Route path="/test" element={<TestPage />} />
        </Routes>
</div>
        {/*Alleen dit <main> stuk wisselt */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
//Zodat main.tsx dit component kan renderen.