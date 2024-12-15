// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   restaurantId: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addItemToCart: (item: CartItem) => void;
//   clearCart: () => void;
//   setCart: (cart: CartItem[]) => void;
//   currentRestaurant: number | null;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// interface CartProviderProps {
//   children: ReactNode;
// }

// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [currentRestaurant, setCurrentRestaurant] = useState<number | null>(null);

//   const addItemToCart = (item: CartItem) => {
//     if (currentRestaurant && currentRestaurant !== item.restaurantId) {
//       alert('Você está adicionando itens de um restaurante diferente. Deseja esvaziar o carrinho?');
//       return;
//     }

//     if (!currentRestaurant) {
//       setCurrentRestaurant(item.restaurantId);
//     }

//     setCart((prevCart) => [...prevCart, item]);
//   };

//   const clearCart = () => {
//     setCart([]);
//     setCurrentRestaurant(null);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addItemToCart, clearCart, setCart, currentRestaurant }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
