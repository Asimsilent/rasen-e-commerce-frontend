"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { closeModal, openModal } from "@/store/modalSlice";
import { addCartItem, removeCartItem } from "@/store/cartSlice";

export default function ProductCard({ productItem }) {
  const { user } = useSelector((state) => state.auth);
  const { isOpen, title } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const router = useRouter();

  // console.log("product", product);
  // console.log("user", user);

  const handleAddCartItem = async () => {
    if (!user) {
      dispatch(closeModal());
      router.push("/signup");
      return;
    }
    try {
      await dispatch(
        addCartItem({ cart: productItem, userId: user._id })
      ).unwrap();
    } catch (err) {
      console.error("adding failed", err);
      // show toast or set local error
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="font-semibold text-lg">{productItem.name}</h2>
      <p className="text-gray-600">${productItem.price}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleAddCartItem}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>

        {/* View Details */}
        {!isOpen && (
          <button
            onClick={() =>
              dispatch(openModal({ title: "product", data: productItem }))
            }
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
