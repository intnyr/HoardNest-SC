import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Try to get displayName, fallback to email
        setFullName(firebaseUser.displayName || firebaseUser.email || "");
      } else {
        setFullName("");
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, fullName };
}
