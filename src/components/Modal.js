"use client";

import { closeModal } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./Login";
import ProductCard from "./ProductCard";
import CartItem from "./CartItem";

export default function Modal() {
  const { isOpen, title, data } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  let content;
  switch (title) {
    case "login":
      content = <LoginForm />;
      break;
    case "product":
      content = content = <ProductCard productItem={data} />;
      break;

    case "cart":
      content = content = <CartItem cartItem={data} />;
      break;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50 px-4 sm:px-6"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-xl relative transition-transform transform scale-95 sm:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg sm:text-xl"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-gray-800 text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
            {title}
          </h2>
        )}

        <div className="text-gray-700 text-sm sm:text-base">{content}</div>
      </div>
    </div>
  );
}
