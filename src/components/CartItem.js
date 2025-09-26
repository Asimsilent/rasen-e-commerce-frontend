"use client";

import { useDispatch, useSelector } from "react-redux";

import { closeModal, openModal } from "@/store/modalSlice";
import { removeCartItem } from "@/store/cartSlice";
import toast from "react-hot-toast";

export default function CartItem({ cartItem }) {
  const user = useSelector((state) => state.auth.user);
  const { isOpen, title } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const handleRemoveCartItem = async () => {
    try {
      await dispatch(
        removeCartItem({ itemId: cartItem._id, userId: user._id })
      ).unwrap();
      toast.success("item successfully removed!");
      dispatch(closeModal());
    } catch (err) {
      console.error("remove failed", err);
      toast.error("removal failed!");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-3 sm:mb-0">
        <h2 className="font-semibold text-lg sm:text-xl text-gray-500">
          {cartItem.name}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">${cartItem.price}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        {!isOpen && (
          <button
            onClick={() =>
              dispatch(openModal({ title: "cart", data: cartItem }))
            }
            className="flex-1 sm:flex-none px-4 py-2 bg-gray-600 text-white rounded-lg
                   hover:bg-gray-700 transition transform duration-200 hover:scale-105"
          >
            View Details
          </button>
        )}

        <button
          onClick={handleRemoveCartItem}
          className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg
                 hover:bg-red-700 transition transform duration-200 hover:scale-105"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
