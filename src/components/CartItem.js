"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import ProductModal from "./ProductModal";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const [cartModalStates, setCartModalStates] = useState({
    isOpen: false,
    initilaizer: "cart",
  });

  return (
    <div className="flex justify-between items-center border rounded-lg p-4 shadow">
      <div>
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-gray-600">${item.price}</p>
      </div>

      <div className="flex gap-2">
        {/* View Details */}
        <button
          onClick={() =>
            setCartModalStates({ ...cartModalStates, isOpen: true })
          }
          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          View Details
        </button>

        {/* Remove from cart */}
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remove
        </button>
      </div>

      {/* Modal (shared component) */}
      <ProductModal
        product={item}
        modalStates={cartModalStates}
        onClose={() =>
          setCartModalStates({ ...cartModalStates, isOpen: false })
        }
      />
    </div>
  );
}
