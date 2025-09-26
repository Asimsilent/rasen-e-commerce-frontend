"use client";

import { useDispatch, useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import { useEffect, useState } from "react";
import { fetchCart } from "@/store/cartSlice";
import Loader from "@/components/Loader";

export default function CartPage() {
  const { loading, items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log("cart items",items);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [user, dispatch]);

  if (loading) return <Loader />;

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
