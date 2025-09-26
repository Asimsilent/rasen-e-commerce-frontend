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
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8  rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center md:text-left">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <CartItem key={item._id} cartItem={item} />
          ))}
        </div>
      )}
    </div>
  );
}
