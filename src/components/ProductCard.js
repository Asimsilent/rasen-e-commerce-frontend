"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { closeModal, openModal } from "@/store/modalSlice";
import { addCartItem } from "@/store/cartSlice";

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
      toast.success("item added successfully!");
      dispatch(closeModal());
    } catch (err) {
      console.error("adding failed", err);
      toast.error(err.addCartItemError);
    }
  };

  return (
    <div className="border rounded-xl p-4 sm:p-6 shadow-lg  bg-gray-300 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-1 text-gray-900">
          {productItem.name}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          ${productItem.price}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button
          onClick={handleAddCartItem}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition transform duration-200 hover:scale-105"
        >
          Add to Cart
        </button>

        {!isOpen && (
          <button
            onClick={() =>
              dispatch(openModal({ title: "product", data: productItem }))
            }
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg
                   hover:bg-gray-700 transition transform duration-200 hover:scale-105"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
