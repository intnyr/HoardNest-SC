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
}

interface ShopContextProps {
  products: Product[];
  loading: boolean;
}

export const ShopContext = createContext<ShopContextProps | null>(null);

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(allItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ShopContext.Provider value={{ products, loading }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
