"use client";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const [menuModalStates, setMenuModalStates] = useState({
    isOpen: false,
    initilaizer: "menu",
  });

  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>

      <div className="flex gap-2 mt-3">
        {/* Add to Cart */}
        <button
          onClick={
            user
              ? () => dispatch(addToCart(product))
              : () => router.push("/login")
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>

        {/* View Details */}
        <button
          onClick={() =>
            setMenuModalStates({ ...menuModalStates, isOpen: true })
          }
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          View Details
        </button>
      </div>

      {/* Shared Modal */}
      <ProductModal
        product={product}
        modalStates={menuModalStates}
        onClose={() =>
          setMenuModalStates({ ...menuModalStates, isOpen: false })
        }
      />
    </div>
  );
}
