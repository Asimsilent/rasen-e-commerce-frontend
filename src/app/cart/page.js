"use client";

import { useDispatch, useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { useEffect, useState } from "react";
import { fetchCart } from "@/store/cartSlice";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log("cart items",items);

  useEffect(() => {
    console.log("running to fetch cart ");
    
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [user, dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item._id} cartItem={item} />
          ))}
        </div>
      )}
    </div>
  );
}
