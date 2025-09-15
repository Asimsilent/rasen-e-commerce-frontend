"use client";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  if (!user) return <p>Please login before checkout.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="list-disc pl-6">
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
