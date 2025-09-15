"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function ProductModal({ product, modalStates, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!modalStates.isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
      onClick={onClose} // clicking background closes modal
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // stop click from closing
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Product details */}
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600 mb-4">
          ${product.price}
        </p>
        {modalStates.initilaizer === "menu" && (
          <button
            onClick={
              user
                ? () => dispatch(addToCart(product))
                : () => router.push("/login")
            }
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
