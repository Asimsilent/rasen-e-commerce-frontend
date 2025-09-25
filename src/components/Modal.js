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
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Optional title */}
        {title && (
          <h2 className="text-gray-700 text-2xl font-bold mb-4">{title}</h2>
        )}

        {/* Content */}
        {content}
      </div>
    </div>
  );
}
