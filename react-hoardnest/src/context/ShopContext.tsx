import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  DocumentData,
} from "firebase/firestore";
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
  sellerName?: string;
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
    // Fetch all users and map uid to displayName
    let userMap: Record<string, string> = {};
    const fetchUsersAndItems = async () => {
      try {
        // Try to get all users from a 'users' collection (if exists)
        const usersSnap = await getDocs(collection(db, "users"));
        usersSnap.forEach((doc) => {
          const data = doc.data() as DocumentData;
          if (data) {
            if (data.displayName) {
              userMap[doc.id] = data.displayName;
            } else if (data.email) {
              userMap[doc.id] = data.email;
            } else {
              userMap[doc.id] = "Unknown";
            }
          }
        });
      } catch (e) {
        // If no users collection, fallback to empty map
        userMap = {};
      }
      const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allItems = snapshot.docs.map((doc) => {
          const data = doc.data();
          const { id, userId, ...rest } = data;
          // If sellerName is missing in Firestore, update it if possible
          let sellerName: string | undefined = undefined;
          if (userId && userMap[userId]) {
            sellerName = userMap[userId];
            // Optionally update Firestore if missing
            if (!data.sellerName || data.sellerName !== sellerName) {
              try {
                // Only update if doc exists and sellerName is different
                import("firebase/firestore").then(
                  ({ doc: docRef, updateDoc }) => {
                    updateDoc(docRef(db, "items", doc.id), { sellerName });
                  }
                );
              } catch (e) {
                // Ignore update errors
              }
            }
          }
          return {
            id: id || doc.id,
            userId,
            sellerName,
            ...rest,
          } as Product;
        });
        setProducts(allItems);
        setLoading(false);
      });
      return unsubscribe;
    };
    let unsubscribe: (() => void) | undefined;
    fetchUsersAndItems().then((unsub) => {
      unsubscribe = unsub;
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
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
