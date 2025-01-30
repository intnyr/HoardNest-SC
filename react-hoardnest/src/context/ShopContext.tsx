import React, { createContext, useState, ReactNode } from "react";
import productImage1 from "../media/product-01.png";
import productImage2 from "../media/product-02.png";
import productImage3 from "../media/product-03.png";
import productImage4 from "../media/product-04.png";
import productImage5 from "../media/product-05.png";
import productImage6 from "../media/product-06.png";
import productImage7 from "../media/product-07.png";
import productImage8 from "../media/product-08.png";
import productImage9 from "../media/product-09.png";
import productImage10 from "../media/product-10.png";
import productImage11 from "../media/product-11.png";
import productImage12 from "../media/product-12.png";
import productImage13 from "../media/product-13.png";
import productImage14 from "../media/product-14.png";
import productImage15 from "../media/product-15.png";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  newlisting: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShopContextProps {
  products: Product[];
  cart: CartItem[];
  currency: string;
  deliveryFee: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const ShopContext = createContext<ShopContextProps | null>(null);

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Sports-casual moccasins",
    price: 150,
    image: productImage1,
    newlisting: true,
  },
  {
    id: 2,
    name: "Stylish women's jacket",
    price: 250,
    image: productImage2,
    newlisting: true,
  },
  {
    id: 3,
    name: "Children’s blouse",
    price: 150,
    image: productImage3,
    newlisting: true,
  },
  {
    id: 4,
    name: "Modern sneakers",
    price: 175,
    image: productImage4,
    newlisting: true,
  },
  {
    id: 5,
    name: "Small shoulder bag",
    price: 100,
    image: productImage5,
    newlisting: true,
  },
  {
    id: 6,
    name: "Men’s wallet",
    price: 115,
    image: productImage6,
    newlisting: true,
  },
  {
    id: 7,
    name: "Casual sneakers",
    price: 250,
    image: productImage7,
    newlisting: true,
  },
  {
    id: 8,
    name: "Women’s slippers",
    price: 125,
    image: productImage8,
    newlisting: true,
  },
  {
    id: 9,
    name: "Camouflage sweater",
    price: 350,
    image: productImage9,
    newlisting: true,
  },
  {
    id: 10,
    name: "Beach shorts",
    price: 150,
    image: productImage10,
    newlisting: true,
  },
  {
    id: 11,
    name: "Swimsuit",
    price: 200,
    image: productImage11,
    newlisting: true,
  },
  {
    id: 12,
    name: "Summer dress",
    price: 500,
    image: productImage12,
    newlisting: true,
  },
  {
    id: 13,
    name: "Denim skirt",
    price: 225,
    image: productImage13,
    newlisting: true,
  },
  {
    id: 14,
    name: "Men’s tank top",
    price: 120,
    image: productImage14,
    newlisting: true,
  },
  {
    id: 15,
    name: "Children’s sports set",
    price: 190,
    image: productImage15,
    newlisting: true,
  },
];

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const currency = "Php";
  const deliveryFee = 25;

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products: initialProducts,
        cart,
        currency,
        deliveryFee,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
