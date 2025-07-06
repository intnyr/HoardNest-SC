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
  const [nest, setNest] = useState<any[]>([]);

  const addToNest = (item: any) => {
    setNest((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromNest = (id: string | number) => {
    setNest((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allItems = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Product)
      );
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
