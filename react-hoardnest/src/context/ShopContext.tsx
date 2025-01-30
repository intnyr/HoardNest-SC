import React, { createContext, ReactNode } from "react";
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
  price: string;
  image: string;
  newlisting: boolean;
}

interface ShopContextProps {
  products: Product[];
  currency: string;
  deliveryFee: number;
}

export const ShopContext = createContext<ShopContextProps | null>(null);

const products: Product[] = [
  {
    id: 1,
    name: "Sports-casual men’s moccasins...",
    price: "Php 150.00",
    image: productImage1,
    newlisting: true,
  },
  {
    id: 2,
    name: "Women’s stylish jacket...",
    price: "Php 250.00",
    image: productImage2,
    newlisting: true,
  },
  {
    id: 3,
    name: "Children’s blouse for girls...",
    price: "Php 150.00",
    image: productImage3,
    newlisting: true,
  },
  {
    id: 4,
    name: "Modern women’s sneakers...",
    price: "Php 175.00",
    image: productImage4,
    newlisting: true,
  },
  {
    id: 5,
    name: "Men’s stylish small shoulder bag...",
    price: "Php 100.00",
    image: productImage5,
    newlisting: true,
  },
  {
    id: 6,
    name: "Men’s black wallet...",
    price: "Php 115.00",
    image: productImage6,
    newlisting: true,
  },
  {
    id: 7,
    name: "Casual men’s sneakers...",
    price: "Php 250.00",
    image: productImage7,
    newlisting: true,
  },
  {
    id: 8,
    name: "Women’s slippers...",
    price: "Php 125.00",
    image: productImage8,
    newlisting: true,
  },
  {
    id: 9,
    name: "Modern men’s camouflage sweater...",
    price: "Php 350.00",
    image: productImage9,
    newlisting: true,
  },
  {
    id: 10,
    name: "Men’s colored beach shorts...",
    price: "Php 150.00",
    image: productImage10,
    newlisting: true,
  },
  {
    id: 11,
    name: "Two-piece swimsuit...",
    price: "Php 200.00",
    image: productImage11,
    newlisting: true,
  },
  {
    id: 12,
    name: "Summer women’s dress...",
    price: "Php 500.00",
    image: productImage12,
    newlisting: true,
  },
  {
    id: 13,
    name: "Modern women’s long denim skirt...",
    price: "Php 225.00",
    image: productImage13,
    newlisting: true,
  },
  {
    id: 14,
    name: "Modern men’s tank top...",
    price: "Php 120.00",
    image: productImage14,
    newlisting: true,
  },
  {
    id: 15,
    name: "Children’s sports set...",
    price: "Php 190.00",
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
  const currency = "Php";
  const deliveryFee = 25;

  return (
    <ShopContext.Provider value={{ products, currency, deliveryFee }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
