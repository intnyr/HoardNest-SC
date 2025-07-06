import React, { createContext, useState, useEffect, ReactNode } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface Product {
  id: string;
  itemName: string;
  price: number;
  imageUrl: string;
  newlisting?: boolean;
  category: string;
  quality: string;
  description: string;
  keywords: string;
  quantity: number;
  createdAt: any;
  userId?: string;
  availability?: string;
}

interface ShopContextProps {
  products: Product[];
  loading: boolean;
  nest: any[];
  addToNest: (item: any) => void;
  removeFromNest: (id: string | number) => void;
}

export const ShopContext = createContext<ShopContextProps | null>(null);

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // Persist nest in localStorage
  const [nest, setNest] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("hoardnest_nest");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToNest = (item: any) => {
    setNest((prev) => {
      if (prev.find((i) => String(i.id) === String(item.id))) return prev;
      const updated = [...prev, item];
      localStorage.setItem("hoardnest_nest", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromNest = (id: string | number) => {
    setNest((prev) => {
      const updated = prev.filter((item) => String(item.id) !== String(id));
      localStorage.setItem("hoardnest_nest", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allItems = snapshot.docs.map((doc) => {
        // Prefer the id field from Firestore data, fallback to doc.id
        const data = doc.data();
        // Remove id from data to avoid duplicate/conflicting id fields
        const { id, ...rest } = data;
        return { id: id || doc.id, ...rest } as Product;
      });
      setProducts(allItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ShopContext.Provider
      value={{ products, loading, nest, addToNest, removeFromNest }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
