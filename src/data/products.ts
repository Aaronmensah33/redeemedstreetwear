/*Dit bestand is:
Een nep-database (mock data) met jouw producten.

Voor nu:
Staat alles hardcoded in een array

Later:
Komt dit uit je backend / database / API */

// Elk item in deze array moet eruitzien als een Product (zoals gedefinieerd in src/types/product.ts) als je 1 vergeert, krijg je een foutmelding.

// dit wordt gebruikt in Home.tsx om de product cards te maken, en in Product.tsx om de details van 1 product te laten zien.
import type { Product } from "../types/product";

import VersityVoor from "../assets/products/versity-voor.png";
import VersityAchter from "../assets/products/versity-achter.png";
import CardiganVoor from "../assets/products/cardigan-voor.png";
import CardiganAchter from "../assets/products/cardigan-achter.png";
import HoodieBlackVoor from "../assets/products/hoodie-voor.png";
import HoodieBlackAchter from "../assets/products/hoodie-achter.png";


// Je exporteert deze lijst zodat andere bestanden (zoals Home.tsx) deze kunnen importeren en gebruiken.
// products is een array van Product items, en dat is wat we later gaan gebruiken om de product cards te maken op de homepage.
export const products: Product[] = [
  {
    id: "versity-jacket-blue",
    name: "Redeemed Versity Jacket Blue",
    price: 59.99,
    imageFront: VersityVoor,
    imageBack: VersityAchter,
    description: "Comfortable blue Versity Jacket with Redeemed branding.",
  },
  {
    id: "cardigan",
    name: "Redeemed Cardigan",
    price: 29.99,
    imageFront: CardiganVoor,
    imageBack: CardiganAchter,
    description: "Clean cardigan, perfect for everyday wear.",
  },
  {
    id: "hoodie-black",
    name: "Redeemed Hoodie Black",
    price: 19.99,
    imageFront: HoodieBlackVoor,
    imageBack: HoodieBlackAchter,
    description: "Black hoodie with minimal logo.",
  },
];