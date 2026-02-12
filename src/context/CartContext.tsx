import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "../types/cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "redeemed_cart_v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (p) => p.productId === item.productId && p.variantId === item.variantId
      );
      if (existing) {
        return prev.map((p) =>
          p.productId === item.productId && p.variantId === item.variantId
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (productId, variantId) => {
    setItems((prev) => prev.filter((p) => !(p.productId === productId && p.variantId === variantId)));
  };

  const setQuantity: CartContextValue["setQuantity"] = (productId, variantId, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((p) => !(p.productId === productId && p.variantId === variantId));
      }
      return prev.map((p) =>
        p.productId === productId && p.variantId === variantId ? { ...p, quantity } : p
      );
    });
  };

  const clear = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value: CartContextValue = { items, addItem, removeItem, setQuantity, clear, totalItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
