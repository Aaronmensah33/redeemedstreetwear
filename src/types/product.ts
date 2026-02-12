export type ProductCategory = "jacket" | "hoodie" | "shirt" | "pants" | "vest";

export type Size = "XS" | "S" | "M" | "L" | "XL";
export type Color = "Black" | "Blue" | "Grey" | "White";

export type ProductVariant = {
  id: string;      // uniek per variant (handig voor backend)
  size: Size;
  color: Color;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  imageFront: string;
  imageBack: string;
  description: string;
  category: ProductCategory;

  variants: ProductVariant[];
};

