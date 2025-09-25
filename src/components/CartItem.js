"use client";

import { useDispatch, useSelector } from "react-redux";

import { openModal } from "@/store/modalSlice";
import { removeCartItem } from "@/store/cartSlice";

export default function CartItem({ cartItem }) {
  const user = useSelector((state) => state.auth.user);
  const { isOpen, title } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const handleRemoveCartItem = async () => {
    try {
      await dispatch(
        removeCartItem({ itemId: cartItem._id, userId: user._id })
      ).unwrap();
    } catch (err) {
      console.error("remove failed", err);
      // show toast or set local error
    }
  };

  return (
    <div className="flex justify-between items-center border rounded-lg p-4 shadow">
      <div>
        <h2 className="font-semibold text-lg">{cartItem.name}</h2>
        <p className="text-gray-600">${cartItem.price}</p>
      </div>

      <div className="flex gap-2">
        {/* View Details */}
        {!isOpen && (
          <button
            onClick={() => dispatch(openModal({ title: "cart", data: cartItem }))}
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            View Details
          </button>
        )}

        {/* Remove from cart */}
        <button
          onClick={handleRemoveCartItem}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
