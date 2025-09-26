"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { logout } from "@/store/authSlice";
import toast from "react-hot-toast";

export default function ProfileBadge() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:gap-3 bg-blue-100 p-2 sm:p-3 rounded-lg shadow-md w-full sm:w-auto">
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src="/solo6.jpg"
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      <span className="text-sm sm:text-base font-medium text-gray-800 mt-1 sm:mt-0">
        {user.firstName}
      </span>

      <button
        onClick={() => {
          dispatch(logout());
          toast.success("Successfully logged out");
          router.push("/signup");
        }}
        className="mt-2 sm:mt-0 sm:ml-3 px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
