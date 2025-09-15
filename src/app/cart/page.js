"use client";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  console.log(cart);
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
